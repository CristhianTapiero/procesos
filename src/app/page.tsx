'use client'
import {useState, useEffect, FormEvent} from 'react'

type task ={
  id: number,
  time: number
}

const Page = () => {
  const [tasks, setTasks] = useState<task[]>([])
  const [time, setTime] = useState<string>("")
  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setTasks([...tasks, {id: tasks.length+1, time: parseInt(time)}])
    setTime("")
  }

  const sortArray= (array : Array<task>) => {
    const sorted = [...array].sort((a,b)=>{
      if (a.time < b.time) return -1 
      if(a.time > b.time) return 1
      return 0
    })
    return sorted
  }
  const setTimeToZero = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, time: 0 };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  let sortedArray = sortArray(tasks)
  let copyArr = [...tasks]
  let firtstNotZero = tasks.findIndex(task => task.time !== 0)
  if(tasks.length>1) copyArr[firtstNotZero] = {id: copyArr[firtstNotZero].id, time: copyArr[firtstNotZero].time-1}
  let SRTF:Array<task> = sortArray(copyArr)
  if(tasks.length>1) SRTF.unshift({id: tasks[firtstNotZero].id, time: 1})

  let counter:number, counter2:number, counter3:number
  counter = counter2 = counter3 = 0 

  return (
    <div className='flex flex-col items-center font-mono'>
      <h1 className='text-green-500 font-semibold text-lg'>Algoritmos de procesador - Cristhian David Tapiero Padilla</h1>
      <form onSubmit={handleSubmit} className='flex gap-3 ml-10 my-5'>
        <input type="text" placeholder='Tiempo de ej.' value={time} className='border-black border rounded-lg px-2 py-1' onChange={(e) => setTime(e.target.value)}></input>
        <input type="submit" className='bg-green-600 rounded-xl px-4 py-2 text-white font-semibold cursor-pointer hover:bg-green-700' value={"Enviar"}/>
      </form>
      { tasks.length>0 && <h2>Orden de llegada</h2>}
      <div className='flex my-5'>
        {
          tasks.map((item) => {
            const letters = [];
            for(let i = 0; i < item.time; i++) {
              letters.push(
                <div key={`${item.id}-${i}`}>
                  <p className='bg-green-600 text-white font-semibold px-3 py-2 border border-black'>{String.fromCharCode(65 + item.id - 1)}</p>
                  <p className='font-semibold px-3 py-2 border border-black'>{counter++}</p>
                </div>
              );
            }
            return letters;
          })
        }
      </div>
      {tasks.length>0 && <h2>Orden de menor tiempo (SJF)</h2>}
      <div className='flex my-5'>
        {
          sortedArray.map((item) => {
            const letters = [];
            for(let i = 0; i < item.time; i++) {
              letters.push(
                <div key={`${item.id}-${i}`}>
                  <p className='bg-green-600 text-white font-semibold px-3 py-2 border border-black'>{String.fromCharCode(65 + item.id - 1)}</p>
                  <p className='font-semibold px-3 py-2 border border-black'>{counter2++}</p>
                </div>
              );
            }
            return letters;
          })
        }
      </div>
      {tasks.length > 0 && <h2>Tiempo restante mas corto (SRTF)</h2>}
      <div className='flex my-5'>
        {
          SRTF.map((item) => {
            const letters = [];
            for(let i = 0; i < item.time; i++) {
              letters.push(
                <div key={`${item.id}-${i}`}>
                  <p className='bg-green-600 text-white font-semibold px-3 py-2 border border-black'>{String.fromCharCode(65 + item.id - 1)}</p>
                  <p className='font-semibold px-3 py-2 border border-black'>{counter3++}</p>
                </div>
              );
            }
            return letters;
          })
        }
      </div>
      {tasks.length>0 && <h2>Eliminar tarea</h2>}
      <div className='flex my-5'>
        {
          tasks.map((item) => {
            return(
                <div key={`${item.id}`}>
                  <p className={`bg-green-600 text-white font-semibold px-3 py-2 border border-black cursor-pointer ${item.time==0 && 'text-gray-600 cursor-not-allowed bg-red-500'}`} onClick={()=>setTimeToZero(item.id)}>{String.fromCharCode(65 + item.id - 1)}</p>
                </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Page;
