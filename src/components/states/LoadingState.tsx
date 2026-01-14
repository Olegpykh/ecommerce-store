interface LoadingStateProps {
  message?: string;
}
const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <div className="py-20 text-center">
      {' '}
      <p className="text-xl">{message}</p>{' '}
    </div>
  );
};
export default LoadingState;
