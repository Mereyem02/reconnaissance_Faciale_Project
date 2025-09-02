import toast, { Toaster } from 'react-hot-toast';
toast.success("Employé ajouté !");

const EmployeeModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(initialData || { name: '', position: '', department: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Modifier" : "Ajouter"} un Employé</h2>
        <input type="text" name="name" placeholder="Nom" value={form.name} onChange={handleChange} className="input" />
        <input type="text" name="position" placeholder="Poste" value={form.position} onChange={handleChange} className="input" />
        <input type="text" name="department" placeholder="Département" value={form.department} onChange={handleChange} className="input" />
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="btn-secondary">Annuler</button>
          <button onClick={handleSubmit} className="btn-primary">Sauvegarder</button>
        </div>
      </div>
    </div>
  );
};
