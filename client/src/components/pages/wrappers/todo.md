5. Compare Initial State
Keep a copy of the initial state and compare it whenever dayTask changes.

```jsx

const initialDayTask = React.useRef({
  user_id: userData?.data?.id || null,
  brainDump: [],
  priorities: [],
  date: formatDate(selectedDate),
});

const [dayTask, setDayTask] = React.useState(initialDayTask.current);
const [showUpdateBtn, setShowUpdateBtn] = React.useState(false);

React.useEffect(() => {
  if (!_.isEqual(initialDayTask.current, dayTask)) {
    setShowUpdateBtn(true);
  }
}, [dayTask]);

const handleUpdate = () => {
  initialDayTask.current = dayTask; // Reset the initial state
  setShowUpdateBtn(false);
};
```

1. Track Changes with useEffect
Use useEffect to monitor changes to the dayTask state and toggle the visibility of the button.

```jsx

const [dayTask, setDayTask] = React.useState({
  user_id: userData?.data?.id || null,
  brainDump: [],
  priorities: [],
  date: formatDate(selectedDate),
});

const [showUpdateBtn, setShowUpdateBtn] = React.useState(false);

React.useEffect(() => {
  setShowUpdateBtn(true); 
}, [dayTask]);

// Reset the button visibility when necessary
const handleUpdate = () => {
  // Handle your update logic here
  setShowUpdateBtn(false);
};

return (
  <>
    <div>{/* Your UI here */}</div>
    {showUpdateBtn && <button onClick={handleUpdate}>Update</button>}
  </>
);
```