interface EmptyStateProps {
  message?: string;
}
const EmptyState = ({ message = 'No items found' }: EmptyStateProps) => {
  return (
    <div className="py-20 text-center">
      {' '}
      <p className="text-xl">{message}</p>{' '}
    </div>
  );
};
export default EmptyState;
