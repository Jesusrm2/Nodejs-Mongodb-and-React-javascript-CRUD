import { useForm  } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import { useNavigate , useParams} from 'react-router-dom';
import { useEffect } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
dayjs.extend(utc);


function TaskFormPage() {
  const {register, handleSubmit,setValue} = useForm();
 const {createTask , getTask, updateTask} = useTasks();
 const navigate = useNavigate()
 const params = useParams();

  useEffect(()=>{
    async function loadtask(){
      if(params.id){
        const task = await getTask(params.id);
        console.log(task)
        setValue('title',task.title);
        setValue('description',task.description);
        setValue('date', dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }
    loadtask()
  },[])

  const onSumitForm = handleSubmit((data) =>{

    const dateValid = {...data, date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()}



    if(params.id){
      updateTask(params.id, dateValid)
    }else{
      createTask(dateValid);
     
    }
    navigate('/task');
  })
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
 <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSumitForm}>
        <label htmlFor='title'>titulo</label>
        <input 
        type='text' 
        placeholder='Titulo'
        {...register("title")}
        className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
        autoFocus
        />
          <label htmlFor='description'>Decripcion</label>
        <textarea 
          rows="3" 
          placeholder='Descripcion'
          className="w-full bg-zinc-700 text-white px-4 my-2 py-2 rounded-md"
          {...register("description")}
        ></textarea>
        <label htmlFor='date'>Fecha</label>
        <input type="date" {...register('date')}
         className="w-full bg-zinc-700 text-white px-4 my-2 py-2 rounded-md"/>
      <button className="bg-indigo-500 px-3 py-2 rounded-md">
        Guardar
      </button>
      </form>
    </div>
    </div>
   
  )
}

export default TaskFormPage
