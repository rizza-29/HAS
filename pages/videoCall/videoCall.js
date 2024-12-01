import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import AddIcon from "@material-ui/icons/Add"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import peer from "simple-peer"
import io from "socket.io-client"
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core"

const socket = io.connect('http://localhost:3000')

function MedicalVideoCall() {
    const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")

    // New states for medical features
    const [ medicines, setMedicines ] = useState([])
    const [ patientHistory, setPatientHistory ] = useState([])
    const [ openMedicineModal, setOpenMedicineModal ] = useState(false)
    const [ newMedicine, setNewMedicine ] = useState({
        name: '',
        dosage: '',
        frequency: '',
        startDate: ''
    })

	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

    useEffect(() => {
        // Check for mediaDevices support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error('Media devices not supported');
          return;
        }
      
        const startVideoCall = async () => {
          try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: { ideal: 'user' },
                width: { ideal: 640, max: 1280 },
                height: { ideal: 480, max: 720 }
              },
              audio: true
            });
      
            // Set the stream
            setStream(mediaStream)

            // Ensure myVideo.current exists before setting srcObject
            if (myVideo.current) {
              myVideo.current.srcObject = mediaStream;
              
              // Orientation change handling
              const handleOrientationChange = () => {
                alert('Device orientation changed');
              };
            
              // Check if orientation API is available
              if (window.screen?.orientation) {
                window.screen.orientation.addEventListener('change', handleOrientationChange);
              } else {
                // Fallback for browsers without orientation API
                window.addEventListener('resize', handleOrientationChange);
              }
            }
          } catch (error) {
            alert("Mobile media access error:" + error);
            
            // Detailed error handling
            switch(error.name) {
              case 'NotAllowedError':
                alert('Camera access was denied');
                break;
              case 'NotFoundError':
                alert('No camera found');
                break;
              default:
                alert('Unable to access media devices');
            }
          }
        };
      
        // Call the async function
        startVideoCall();      

        socket.on("me",(id)=>{
            console.log("SocketId",id);
            setMe(id)
        })
        socket.on("callUser",(data)=>{
            setReceivingCall(true);
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser =(id)=>{
        const Peer = new peer ({
            initiator: true,
            trickel: true,
            stream: stream
        })
        Peer.on("signal",(data)=>{
            socket.emit("callUser",{
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        Peer.on("stream",(stream)=>{
            userVideo.current.srcObject = stream
        })

        socket.on("callAccepted",(signal)=>{
            setCallAccepted(true)
            Peer.signal(signal)
        })
        connectionRef.current = Peer
    }

    const answerCall = () =>{
        setCallAccepted(true)
        const Peer = new peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        Peer.on("signal", (data)=>{
            socket.emit("answerCall",{signal: data, to: caller})
        })
        Peer.on("stream",(stream)=>{
            userVideo.current.srcObject = stream
        })
        Peer.signal(callerSignal)
        connectionRef.current = Peer
    }

    const endCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }   

    const addMedicine = () => {
        setMedicines([...medicines, newMedicine])
        setOpenMedicineModal(false)
        setNewMedicine({
            name: '',
            dosage: '',
            frequency: '',
            startDate: ''
        })
    }

    return (
        <div className="medical-consultation-container" style={{
            display: 'flex',
            height: '100vh',
            backgroundColor: '#e6f2f7' // Light blue background
        }}>
            {/* Prescription Side Panel */}
            <div className="prescription-panel" style={{
                width: '250px',
                backgroundColor: '#f0f8ff', // Very light blue
                padding: '20px',
                borderRight: '1px solid #b0c4de',
                overflowY: 'auto'
            }}>
                <div className="prescription-header" style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ color: '#2c3e50' }}>Prescriptions</h3>
                    <IconButton 
                        color="primary" 
                        onClick={() => setOpenMedicineModal(true)}
                        style={{ backgroundColor: '#3498db', color: 'white' }}
                    >
                        <AddIcon />
                    </IconButton>
                </div>
                {medicines.map((med, index) => (
                    <div key={index} style={{
                        border: '1px solid #bdc3c7',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        backgroundColor: 'white'
                    }}>
                        <strong style={{ color: '#2980b9' }}>{med.name}</strong>
                        <p>Dosage: {med.dosage}</p>
                        <p>Frequency: {med.frequency}</p>
                    </div>
                ))}
            </div>

            {/* Video Call Section */}
            <div className="video-consultation-section" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f4f8' // Soft grey-blue
            }}>
                <div className="video-container" style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px'
                }}>
                    <div className="caller-video" style={{ 
                        backgroundColor: '#ffffff', 
                        padding: '10px', 
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        {stream && <video 
                            playsInline 
                            muted 
                            ref={myVideo} 
                            autoPlay 
                            style={{ 
                                width: "400px", 
                                borderRadius: '10px',
                                border: '2px solid #3498db'
                            }} 
                        />}
                    </div>
                    <div className="user-video" style={{ 
                        backgroundColor: '#ffffff', 
                        padding: '10px', 
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        {callAccepted && !callEnded ? (
                            <video 
                                playsInline 
                                ref={userVideo} 
                                autoPlay 
                                style={{ 
                                    width: "300px", 
                                    borderRadius: '10px',
                                    border: '2px solid #2ecc71'
                                }} 
                            />
                        ) : null}
                    </div>
                </div>

                <div className="call-button">
                    <TextField
                        id="filled-basic"
                        label="ID to call"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                        style={{ marginRight: '10px', backgroundColor: 'white' }}
                    />
                    {callAccepted && !callEnded ? (
                        <Button variant="contained" color="secondary" onClick={endCall}>
                            End Call
                        </Button>
                    ) : (
                        <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                            <PhoneIcon fontSize="large" />
                        </IconButton>
                    )}
                </div>

                {receivingCall && !callAccepted ? (
                    <div className="caller" style={{
                        marginTop: '20px',
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <h1 style={{ color: '#2c3e50' }}>{name} is calling...</h1>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={answerCall}
                        >
                            Answer
                        </Button>
                    </div>
                ) : null}
            </div>

            {/* Patient History Side Panel */}
            <div className="patient-history-panel" style={{
                width: '250px',
                backgroundColor: '#f0f8ff', // Very light blue
                padding: '20px',
                borderLeft: '1px solid #b0c4de',
                overflowY: 'auto'
            }}>
                <div className="patient-history-header" style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ color: '#2c3e50' }}>Patient History</h3>
                </div>
                {patientHistory.length === 0 ? (
                    <p style={{ color: '#7f8c8d', textAlign: 'center' }}>
                        No patient history available
                    </p>
                ) : (
                    patientHistory.map((record, index) => (
                        <div key={index} style={{
                            border: '1px solid #bdc3c7',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            backgroundColor: 'white'
                        }}>
                            <strong style={{ color: '#2980b9' }}>{record.type}</strong>
                            <p>{record.details}</p>
                            <p>Date: {record.date}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Medicine Add Modal */}
            <Dialog 
                open={openMedicineModal} 
                onClose={() => setOpenMedicineModal(false)}
            >
                <DialogTitle>Add New Medicine</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Medicine Name"
                        fullWidth
                        value={newMedicine.name}
                        onChange={(e) => setNewMedicine({
                            ...newMedicine, 
                            name: e.target.value
                        })}
                        margin="dense"
                    />
                    <TextField
                        label="Dosage"
                        fullWidth
                        value={newMedicine.dosage}
                        onChange={(e) => setNewMedicine({
                            ...newMedicine, 
                            dosage: e.target.value
                        })}
                        margin="dense"
                    />
                    <TextField
                        label="Frequency"
                        fullWidth
                        value={newMedicine.frequency}
                        onChange={(e) => setNewMedicine({
                            ...newMedicine, 
                            frequency: e.target.value
                        })}
                        margin="dense"
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newMedicine.startDate}
                        onChange={(e) => setNewMedicine({
                            ...newMedicine, 
                            startDate: e.target.value
                        })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenMedicineModal(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={addMedicine} color="primary">
                        Add Medicine
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MedicalVideoCall