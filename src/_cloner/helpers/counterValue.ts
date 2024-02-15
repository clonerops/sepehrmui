export const counterValue = (value: any, setCounter: React.Dispatch<React.SetStateAction<number>>) => {
    const targetValue = parseInt(value, 10);
    const step = Math.ceil(targetValue / 100);
    const interval = setInterval(() => {
        setCounter((prevCounter) => Math.min(prevCounter + step, targetValue));
      }, 20);
      return () => clearInterval(interval);
}