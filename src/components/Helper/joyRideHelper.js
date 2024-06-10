export const steps = [
    {
      target: '.my-first-step',
      content: 'All the chats listed here.',
    },
    {
      target: '.my-second-step',
      content: 'Click here to start chat',
    },
    {
      target: '.my-third-step',
      content: 'Search any user here',
    },
    {
      target: '.my-fourth-step',
      content: 'Create group.',
    },
    {
      target: '.my-fifth-step',
      content: 'All notification shown here.',
    },
    {
      target: '.my-sixth-step',
      content: 'Click on photo to open user profile',
    },
    {
      target: '.my-seventh-step',
      content: 'Engage with community.',
    },
    {
      target: '.my-eighth-step',
      content: 'Chat more options.',
    },
  ];
  export const customStyles = {
    options: {
      arrowColor: '#e3ffeb',
      backgroundColor: '#e3ffeb',
      overlayColor: 'rgba(79, 26, 0, 0.4)',
      primaryColor: '#000',
      textColor: 'black',
      fontWeight:'bold',
      width: 300,
      zIndex: 1000,
    },
    buttonClose: {
      display: 'none',
    },
    buttonNext: {
      backgroundColor: 'orange',
      borderRadius: '8px',
      color: 'white',
    },
    buttonBack: {
      marginRight: 10,
      color: '#004a14',
    },
    buttonSkip: {
      color: '#004a14',
    },
    tooltip: {
      padding: '20px',
      borderRadius: '10px',
    },
    tooltipContainer: {
      textAlign: 'left',
    },
    tooltipTitle: {
      margin: '0 0 10px 0',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    tooltipContent: {
      fontSize: '14px',
    },
    tooltipFooter: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };

export const handleJoyrideCallback = (data,setRun) => {
    console.log("data : ",data);
    const { type } = data;
    if (type === 'tour:end') {
      setRun(false);
      localStorage.setItem('joyride-tour-completed', true);
    }
  };