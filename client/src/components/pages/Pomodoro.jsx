import React, { useState, useEffect, useRef } from "react";
import { 
 Button, 
 Input, 
 Card, 
 Progress, 
 Slider, 
 Switch, 
 Tabs, 
 List, 
 Avatar, 
 Space, 
 Typography,
 Statistic,
 Row,
 Col,
 Badge,
 Tooltip,
 Modal,
 Select,
 Alert,
 notification
} from "antd";
import {
 FaPlay,
 FaPause,
 FaRedo,
 FaClock,
 FaCoffee,
 FaBed,
 FaPlus,
 FaTrash,
 FaCheck,
 FaChartLine,
 FaVolumeUp,
 FaVolumeMute,
 FaYoutube,
 FaSpotify,
 FaSoundcloud,
 FaMusic,
 FaFire,
 FaTrophy,
 
 FaCalendarAlt,
 FaStar,
 FaBookmark,
 FaEdit,
 FaCog,
 FaDownload,
 FaShare,
 FaChartBar
} from "react-icons/fa"; 
import  {FiTarget, FiMusic, FiSettings} from "react-icons/fi";

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export default function Pomodoro() {
 // Timer States
 const [minutes, setMinutes] = useState(25);
 const [seconds, setSeconds] = useState(0);
 const [isActive, setIsActive] = useState(false);
 const [mode, setMode] = useState("study");
 const [cycle, setCycle] = useState(1);
 const [totalCycles, setTotalCycles] = useState(4);
 
 // Task Management
 const [tasks, setTasks] = useState([
   { id: 1, title: "Complete project proposal", completed: false, pomodoros: 3, currentPomodoros: 1 },
   { id: 2, title: "Review code changes", completed: false, pomodoros: 2, currentPomodoros: 0 },
   { id: 3, title: "Update documentation", completed: true, pomodoros: 1, currentPomodoros: 1 }
 ]);
 const [newTask, setNewTask] = useState("");
 const [selectedTask, setSelectedTask] = useState(null);
 
 // Music & Sounds
 const [youtubeUrl, setYoutubeUrl] = useState("");
 const [isPlaying, setIsPlaying] = useState(false);
 const [volume, setVolume] = useState(50);
 const [isMuted, setIsMuted] = useState(false);
 const [soundEnabled, setSoundEnabled] = useState(true);
 const [ambientSounds, setAmbientSounds] = useState("rain");
 
 // Statistics
 const [dailyStats, setDailyStats] = useState({
   completedPomodoros: 12,
   totalFocusTime: 300, // minutes
   completedTasks: 5,
   streak: 7
 });
 const [weeklyStats, setWeeklyStats] = useState([
   { day: 'Mon', pomodoros: 8 },
   { day: 'Tue', pomodoros: 12 },
   { day: 'Wed', pomodoros: 6 },
   { day: 'Thu', pomodoros: 15 },
   { day: 'Fri', pomodoros: 10 },
   { day: 'Sat', pomodoros: 4 },
   { day: 'Sun', pomodoros: 7 }
 ]);
 
 // Settings
 const [settings, setSettings] = useState({
   studyTime: 25,
   shortBreakTime: 5,
   longBreakTime: 15,
   autoStartBreaks: true,
   autoStartPomodoros: false,
   notifications: true,
   darkMode: false
 });
 
 // UI States
 const [showSettings, setShowSettings] = useState(false);
 const [showStats, setShowStats] = useState(false);
 const [activeTab, setActiveTab] = useState("timer");
 
 const audioRef = useRef(null);
 const youtubeRef = useRef(null);

 const modes = {
   study: { 
     time: settings.studyTime, 
     label: "Focus Time", 
     icon: <FaClock />, 
     color: "#10b981",
     bgGradient: "from-green-400 to-blue-500"
   },
   shortBreak: { 
     time: settings.shortBreakTime, 
     label: "Short Break", 
     icon: <FaCoffee />, 
     color: "#f59e0b",
     bgGradient: "from-yellow-400 to-orange-500"
   },
   longBreak: { 
     time: settings.longBreakTime, 
     label: "Long Break", 
     icon: <FaBed />, 
     color: "#8b5cf6",
     bgGradient: "from-purple-400 to-pink-500"
   },
 };

 const ambientSoundOptions = [
   { value: "rain", label: "Rain", icon: "🌧️" },
   { value: "forest", label: "Forest", icon: "🌲" },
   { value: "ocean", label: "Ocean", icon: "🌊" },
   { value: "cafe", label: "Café", icon: "☕" },
   { value: "fireplace", label: "Fireplace", icon: "🔥" },
   { value: "white-noise", label: "White Noise", icon: "📻" }
 ];

 // Timer Logic
 useEffect(() => {
   let interval;
   if (isActive) {
     interval = setInterval(() => {
       if (seconds === 0) {
         if (minutes === 0) {
           handleTimerComplete();
         } else {
           setMinutes(minutes - 1);
           setSeconds(59);
         }
       } else {
         setSeconds(seconds - 1);
       }
     }, 1000);
   }
   return () => clearInterval(interval);
 }, [isActive, minutes, seconds]);

 const handleTimerComplete = () => {
   setIsActive(false);
   
   if (soundEnabled) {
     playNotificationSound();
   }
   
   if (settings.notifications) {
     notification.success({
       message: `${modes[mode].label} Complete!`,
       description: `Time to ${mode === 'study' ? 'take a break' : 'get back to work'}`,
       duration: 5,
     });
   }
   
   // Update statistics
   if (mode === 'study') {
     setDailyStats(prev => ({
       ...prev,
       completedPomodoros: prev.completedPomodoros + 1,
       totalFocusTime: prev.totalFocusTime + settings.studyTime
     }));
     
     // Update task progress
     if (selectedTask) {
       setTasks(prev => prev.map(task => 
         task.id === selectedTask.id 
           ? { ...task, currentPomodoros: task.currentPomodoros + 1 }
           : task
       ));
     }
   }
   
   // Auto-advance logic
   if (mode === 'study') {
     if (cycle % 4 === 0) {
       if (settings.autoStartBreaks) {
         resetTimer('longBreak');
         setIsActive(true);
       } else {
         resetTimer('longBreak');
       }
     } else {
       if (settings.autoStartBreaks) {
         resetTimer('shortBreak');
         setIsActive(true);
       } else {
         resetTimer('shortBreak');
       }
     }
     setCycle(prev => prev + 1);
   } else {
     if (settings.autoStartPomodoros) {
       resetTimer('study');
       setIsActive(true);
     } else {
       resetTimer('study');
     }
   }
 };

 const playNotificationSound = () => {
   if (audioRef.current) {
     audioRef.current.play();
   }
 };

 const resetTimer = (newMode = mode) => {
   setMode(newMode);
   setMinutes(modes[newMode].time);
   setSeconds(0);
   setIsActive(false);
 };

 const addTask = () => {
   if (newTask.trim()) {
     const task = {
       id: Date.now(),
       title: newTask,
       completed: false,
       pomodoros: 1,
       currentPomodoros: 0
     };
     setTasks([...tasks, task]);
     setNewTask("");
   }
 };

 const toggleTask = (taskId) => {
   setTasks(prev => prev.map(task => 
     task.id === taskId ? { ...task, completed: !task.completed } : task
   ));
   
   if (!tasks.find(t => t.id === taskId).completed) {
     setDailyStats(prev => ({
       ...prev,
       completedTasks: prev.completedTasks + 1
     }));
   }
 };

 const deleteTask = (taskId) => {
   setTasks(prev => prev.filter(task => task.id !== taskId));
   if (selectedTask?.id === taskId) {
     setSelectedTask(null);
   }
 };

 const getYouTubeVideoId = (url) => {
   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&\?]*).*/;
   const match = url.match(regExp);
   return (match && match[2].length === 11) ? match[2] : null;
 };

 const handleYouTubePlay = () => {
   const videoId = getYouTubeVideoId(youtubeUrl);
   if (videoId) {
     setIsPlaying(!isPlaying);
   }
 };

 const formatTime = (totalMinutes) => {
   const hours = Math.floor(totalMinutes / 60);
   const mins = totalMinutes % 60;
   return `${hours}h ${mins}m`;
 };

 const progress = ((modes[mode].time * 60 - (minutes * 60 + seconds)) / (modes[mode].time * 60)) * 100;

 return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
     <div className="max-w-6xl mx-auto">
       {/* Header */}
       <div className="text-center mb-8">
         <Title level={1} className="dark:text-white mb-2">
           <FaFire className="inline mr-3 text-orange-500" />
           Advanced Pomodoro Timer
         </Title>
         <Text className="text-lg dark:text-gray-300">
           Boost your productivity with focused work sessions
         </Text>
       </div>

       {/* Main Content */}
       <Row gutter={[24, 24]}>
         {/* Timer Section */}
         <Col xs={24} lg={12}>
           <Card className="dark:bg-gray-800 dark:border-gray-700 h-full">
             <div className="text-center">
               {/* Circular Progress */}
               <div className="relative inline-block mb-6">
                 <Progress
                   type="circle"
                   percent={progress}
                   width={280}
                   strokeColor={{
                     '0%': modes[mode].color,
                     '100%': '#87d068',
                   }}
                   trailColor="#f0f0f0"
                   strokeWidth={8}
                   format={() => (
                     <div className="text-center">
                       <div className="text-5xl font-mono font-bold dark:text-white mb-2">
                         {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                       </div>
                       <div className="text-lg dark:text-gray-300 flex items-center justify-center">
                         {modes[mode].icon}
                         <span className="ml-2">{modes[mode].label}</span>
                       </div>
                     </div>
                   )}
                 />
                 
                 {/* Cycle indicator */}
                 <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                   <Badge count={`Cycle ${cycle}`} style={{ backgroundColor: modes[mode].color }} />
                 </div>
               </div>

               {/* Controls */}
               <Space size="large" className="mb-6">
                 <Button
                   type="primary"
                   size="large"
                   onClick={() => setIsActive(!isActive)}
                   icon={isActive ? <FaPause /> : <FaPlay />}
                   style={{ backgroundColor: modes[mode].color, borderColor: modes[mode].color }}
                   className="px-8"
                 >
                   {isActive ? "Pause" : "Start"}
                 </Button>
                 <Button
                   size="large"
                   onClick={() => resetTimer(mode)}
                   icon={<FaRedo />}
                   className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                 >
                   Reset
                 </Button>
               </Space>

               {/* Mode Selection */}
               <div className="grid grid-cols-3 gap-3 mb-6">
                 {Object.entries(modes).map(([key, value]) => (
                   <Button
                     key={key}
                     className={`h-auto py-3 ${
                       mode === key 
                         ? `border-2 dark:text-white` 
                         : "dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                     }`}
                     style={mode === key ? { borderColor: value.color, color: value.color } : {}}
                     onClick={() => resetTimer(key)}
                   >
                     <div className="flex flex-col items-center">
                       <div className="text-xl mb-1">{value.icon}</div>
                       <div className="text-xs">{value.label}</div>
                       <div className="text-xs opacity-75">{value.time}min</div>
                     </div>
                   </Button>
                 ))}
               </div>

               {/* Current Task */}
               {selectedTask && (
                 <Alert
                   message={`Working on: ${selectedTask.title}`}
                   description={`Progress: ${selectedTask.currentPomodoros}/${selectedTask.pomodoros} pomodoros`}
                   type="info"
                   className="mb-4 dark:bg-gray-700 dark:border-gray-600"
                   action={
                     <Button size="small" onClick={() => setSelectedTask(null)}>
                       Clear
                     </Button>
                   }
                 />
               )}
             </div>
           </Card>
         </Col>

         {/* Side Panel */}
         <Col xs={24} lg={12}>
           <Card className="dark:bg-gray-800 dark:border-gray-700 h-full">
             <Tabs 
               activeKey={activeTab} 
               onChange={setActiveTab}
               className="dark:text-white"
             >
               {/* Tasks Tab */}
               <TabPane tab={<span><FiTarget className="mr-2" />Tasks</span>} key="tasks">
                 <div className="space-y-4">
                   <div className="flex gap-2">
                     <Input
                       placeholder="Add a new task..."
                       value={newTask}
                       onChange={(e) => setNewTask(e.target.value)}
                       onPressEnter={addTask}
                       className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                     />
                     <Button 
                       type="primary" 
                       icon={<FaPlus />} 
                       onClick={addTask}
                       style={{ backgroundColor: modes[mode].color, borderColor: modes[mode].color }}
                     >
                       Add
                     </Button>
                   </div>

                   <List
                     dataSource={tasks}
                     renderItem={(task) => (
                       <List.Item
                         className="dark:border-gray-600"
                         actions={[
                           <Tooltip title="Select for timer">
                             <Button
                               size="small"
                               type={selectedTask?.id === task.id ? "primary" : "default"}
                               onClick={() => setSelectedTask(task)}
                               icon={<FaBookmark />}
                               className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                             />
                           </Tooltip>,
                           <Button
                             size="small"
                             onClick={() => toggleTask(task.id)}
                             icon={<FaCheck />}
                             type={task.completed ? "primary" : "default"}
                             className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                           />,
                           <Button
                             size="small"
                             danger
                             onClick={() => deleteTask(task.id)}
                             icon={<FaTrash />}
                           />
                         ]}
                       >
                         <div className="flex-1">
                           <Text 
                             delete={task.completed}
                             className={`dark:text-white ${task.completed ? 'opacity-60' : ''}`}
                           >
                             {task.title}
                           </Text>
                           <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                             {task.currentPomodoros}/{task.pomodoros} pomodoros
                           </div>
                           <Progress 
                             percent={(task.currentPomodoros / task.pomodoros) * 100} 
                             size="small" 
                             className="mt-1"
                           />
                         </div>
                       </List.Item>
                     )}
                   />
                 </div>
               </TabPane>

               {/* Music Tab */}
               <TabPane tab={<span><FaMusic className="mr-2" />Music</span>} key="music">
                 <div className="space-y-4">
                   {/* YouTube Integration */}
                   <div>
                     <Text strong className="dark:text-white">YouTube Player</Text>
                     <div className="flex gap-2 mt-2">
                       <Input
                         placeholder="Paste YouTube URL here..."
                         value={youtubeUrl}
                         onChange={(e) => setYoutubeUrl(e.target.value)}
                         prefix={<FaYoutube className="text-red-500" />}
                         className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                       />
                       <Button
                         onClick={handleYouTubePlay}
                         icon={isPlaying ? <FaPause /> : <FaPlay />}
                         disabled={!getYouTubeVideoId(youtubeUrl)}
                         className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                       >
                         {isPlaying ? "Pause" : "Play"}
                       </Button>
                     </div>
                   </div>

                   {/* YouTube Embed */}
                   {getYouTubeVideoId(youtubeUrl) && (
                     <div className="aspect-video">
                       <iframe
                         ref={youtubeRef}
                         width="100%"
                         height="100%"
                         src={`https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}?autoplay=${isPlaying ? 1 : 0}&loop=1`}
                         title="YouTube player"
                         frameBorder="0"
                         allowFullScreen
                         className="rounded-lg"
                       />
                     </div>
                   )}

                   {/* Ambient Sounds */}
                   <div>
                     <Text strong className="dark:text-white">Ambient Sounds</Text>
                     <Select
                       value={ambientSounds}
                       onChange={setAmbientSounds}
                       className="w-full mt-2 dark:bg-gray-700"
                       placeholder="Choose ambient sound"
                     >
                       {ambientSoundOptions.map(option => (
                         <Option key={option.value} value={option.value}>
                           {option.icon} {option.label}
                         </Option>
                       ))}
                     </Select>
                   </div>

                   {/* Volume Control */}
                   <div>
                     <div className="flex items-center justify-between mb-2">
                       <Text strong className="dark:text-white">Volume</Text>
                       <Button
                         size="small"
                         onClick={() => setIsMuted(!isMuted)}
                         icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                         className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                       />
                     </div>
                     <Slider
                       value={volume}
                       onChange={setVolume}
                       disabled={isMuted}
                       tooltip={{ formatter: (value) => `${value}%` }}
                     />
                   </div>

                   {/* Sound Settings */}
                   <div className="flex items-center justify-between">
                     <Text className="dark:text-white">Timer Notifications</Text>
                     <Switch
                       checked={soundEnabled}
                       onChange={setSoundEnabled}
                     />
                   </div>
                 </div>
               </TabPane>

               {/* Stats Tab */}
               <TabPane tab={<span><FaChartLine className="mr-2" />Stats</span>} key="stats">
                 <div className="space-y-6">
                   {/* Daily Stats */}
                   <Row gutter={16}>
                     <Col span={12}>
                       <Card size="small" className="dark:bg-gray-700 dark:border-gray-600">
                         <Statistic
                           title={<span className="dark:text-gray-300">Completed Pomodoros</span>}
                           value={dailyStats.completedPomodoros}
                           prefix={<FaTrophy className="text-yellow-500" />}
                           valueStyle={{ color: '#10b981' }}
                         />
                       </Card>
                     </Col>
                     <Col span={12}>
                       <Card size="small" className="dark:bg-gray-700 dark:border-gray-600">
                         <Statistic
                           title={<span className="dark:text-gray-300">Focus Time</span>}
                           value={formatTime(dailyStats.totalFocusTime)}
                           prefix={<FaClock className="text-blue-500" />}
                           valueStyle={{ color: '#3b82f6' }}
                         />
                       </Card>
                     </Col>
                   </Row>

                   <Row gutter={16}>
                     <Col span={12}>
                       <Card size="small" className="dark:bg-gray-700 dark:border-gray-600">
                         <Statistic
                           title={<span className="dark:text-gray-300">Tasks Done</span>}
                           value={dailyStats.completedTasks}
                           prefix={<FaCheck className="text-green-500" />}
                           valueStyle={{ color: '#10b981' }}
                         />
                       </Card>
                     </Col>
                     <Col span={12}>
                       <Card size="small" className="dark:bg-gray-700 dark:border-gray-600">
                         <Statistic
                           title={<span className="dark:text-gray-300">Day Streak</span>}
                           value={dailyStats.streak}
                           prefix={<FaFire className="text-orange-500" />}
                           valueStyle={{ color: '#f97316' }}
                         />
                       </Card>
                     </Col>
                   </Row>

                   {/* Weekly Chart */}
                   <div>
                     <Text strong className="dark:text-white mb-4 block">Weekly Progress</Text>
                     <div className="grid grid-cols-7 gap-2">
                       {weeklyStats.map((day, index) => (
                         <div key={index} className="text-center">
                           <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                             {day.day}
                           </div>
                           <div 
                             className="bg-green-500 rounded"
                             style={{ 
                               height: `${Math.max(day.pomodoros * 4, 8)}px`,
                               opacity: day.pomodoros / 15
                             }}
                           />
                           <div className="text-xs mt-1 dark:text-white">
                             {day.pomodoros}
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Export Options */}
                   <div className="flex gap-2">
                     <Button 
                       icon={<FaDownload />} 
                       className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                     >
                       Export Data
                     </Button>
                     <Button 
                       icon={<FaShare />}
                       className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                     >
                       Share Progress
                     </Button>
                   </div>
                 </div>
               </TabPane>
             </Tabs>
           </Card>
         </Col>
       </Row>

       {/* Settings Modal */}
       <Modal
         title="Settings"
         open={showSettings}
         onCancel={() => setShowSettings(false)}
         footer={null}
         className="dark:bg-gray-800"
       >
         <div className="space-y-4">
           <div>
             <Text strong className="dark:text-white">Study Time (minutes)</Text>
             <Slider
               min={1}
               max={60}
               value={settings.studyTime}
               onChange={(value) => setSettings(prev => ({ ...prev, studyTime: value }))}
               marks={{ 25: '25min', 45: '45min' }}
             />
           </div>
           
           <div>
             <Text strong className="dark:text-white">Short Break (minutes)</Text>
             <Slider
               min={1}
               max={15}
               value={settings.shortBreakTime}
               onChange={(value) => setSettings(prev => ({ ...prev, shortBreakTime: value }))}
               marks={{ 5: '5min', 10: '10min' }}
             />
           </div>
           
           <div>
             <Text strong className="dark:text-white">Long Break (minutes)</Text>
             <Slider
               min={5}
               max={30}
               value={settings.longBreakTime}
               onChange={(value) => setSettings(prev => ({ ...prev, longBreakTime: value }))}
               marks={{ 15: '15min', 25: '25min' }}
             />
           </div>

           <div className="space-y-2">
             <div className="flex items-center justify-between">
               <Text className="dark:text-white">Auto-start breaks</Text>
               <Switch
                 checked={settings.autoStartBreaks}
                 onChange={(checked) => setSettings(prev => ({ ...prev, autoStartBreaks: checked }))}
               />
             </div>
             
             <div className="flex items-center justify-between">
               <Text className="dark:text-white">Auto-start pomodoros</Text>
               <Switch
                 checked={settings.autoStartPomodoros}
                 onChange={(checked) => setSettings(prev => ({ ...prev, autoStartPomodoros: checked }))}
               />
             </div>
             
             <div className="flex items-center justify-between">
               <Text className="dark:text-white">Desktop notifications</Text>
               <Switch
                 checked={settings.notifications}
                 onChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
               />
             </div>
           </div>
         </div>
       </Modal>

       {/* Floating Action Buttons */}
       <div className="fixed bottom-6 right-6 flex flex-col gap-3">
         <Tooltip title="Settings">
           <Button
             type="primary"
             shape="circle"
             size="large"
             icon={<FaCog />}
             onClick={() => setShowSettings(true)}
             className="shadow-lg"
           />
         </Tooltip>
         <Tooltip title="Statistics">
           <Button
             type="primary"
             shape="circle"
             size="large"
             icon={<FaChartBar />}
             onClick={() => setActiveTab("stats")}
             className="shadow-lg"
           />
         </Tooltip>
       </div>

       {/* Hidden audio element for notifications */}
       <audio ref={audioRef} preload="auto">
         <source src="/notification-sound.mp3" type="audio/mpeg" />
       </audio>
     </div>
   </div>
 );
}