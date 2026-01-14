interface ErrorStateProps {
  message?: string;
}
const ErrorState = ({ message = 'Something went wrong' }: ErrorStateProps) => {
  return (
    <div className="py-20 text-center text-red-500">
      {' '}
      <p className="text-xl">{message}</p>{' '}
    </div>
  );
};
export default ErrorState;
