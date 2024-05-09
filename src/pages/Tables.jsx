import UploadForm from "../components/UploadForm";
import TableSelector from "../components/TableSelector";

const Tables = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-cyan-900">
      <div className="relative w-5/6 mb-20 overflow-y-auto bg-white shadow-2xl rounded-3xl h-3/4">
        <div className="sticky top-0 z-10 flex justify-between p-4 px-8 shadow-md bg-rose-900">
          <div className="flex justify-between w-full px-4 py-4 text-white">
            <h2 className="text-3xl font-semibold ">Tables</h2>
            <a
              className="flex items-center h-full p-2 text-2xl transition duration-300 border rounded-md cursor-pointer bg-rose-900 hover:brightness-125"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              New Table
            </a>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <UploadForm></UploadForm>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <TableSelector></TableSelector>
      </div>
    </div>
  );
};

export default Tables;
