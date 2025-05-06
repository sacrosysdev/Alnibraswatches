import { checkOutValidation } from "../../constant/schema";

const AddressModal = ({ initialValues, onSubmit, handleCloseModal }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-xs bg-black/30"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <Formik
          initialValues={initialValues}
          validationSchema={checkOutValidation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CheckOutForm />
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Saving..." : "Save Address"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddressModal;
