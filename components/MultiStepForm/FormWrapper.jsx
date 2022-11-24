const FormWrapper = ({ title, children }) => {
  return (
    <div className="mt-2 mb-8">
      <h2 className="text-center mb-8">{title}</h2>
      <div className="flex flex-col justify-center items-center gap-y-4 gap-x-2">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
