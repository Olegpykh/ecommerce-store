interface SectionTitleProps {
  title?: string;
}
export const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h2 className="mb-6 text-2xl font-semibold">{title}</h2>;
};
