const ModalStyle = () => {
    return (
        <style jsx>{`
            @keyframes popup-in {
              from {
                transform: scale(0.9);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
    
            @keyframes popup-out {
              from {
                transform: scale(1);
                opacity: 1;
              }
              to {
                transform: scale(0.9);
                opacity: 0;
              }
            }
          `}</style>
    );
}

export default ModalStyle;
