import React,{useState,useEffect} from 'react';
import {Bar,Line} from "react-chartjs-2"
import { getRoutinesMonthlyAnalysis, getRoutinesWeeklyAnalysis, getTasksMonthlyAnalysis, getTasksWeeklyAnalysis } from '../services/analyseService';
import { getMonthDates } from '../services/helpers';

const WeeklyTasksData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri','Sat','Sun'
    //  '6','7','8','9',
    // '10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'
],
    datasets: [

      {
        label: 'Total Tasks',
        data: [],
        backgroundColor: 'rgb(5, 56, 107)',
      },
      {
        label: 'Completed Tasks',
        data: [],
        backgroundColor: 'rgb(92, 219, 149)',
      },
    ],
  };

  const WeeklyRoutinesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri','Sat','Sun'
    //  '6','7','8','9',
    // '10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'
],
    datasets: [

      {
        label: 'Total Routines',
        data: [],
        backgroundColor: 'rgb(5, 56, 107)',
      },
      {
        label: 'Completed Routines',
        data: [],
        backgroundColor: 'rgb(92, 219, 149)',
      },
    ],
  };
  const MonthlyTasksData = {
    labels: getMonthDates(),
    datasets: [

      {
        label: 'Total Tasks',
        data: [],
        backgroundColor: 'rgb(5, 56, 107)',
      },
      {
        label: 'Completed Tasks',
        data: [],
        backgroundColor: 'rgb(92, 219, 149)',
      },
    ],
  };
  const MonthlyRoutinesData = {
    labels: getMonthDates(),
    datasets: [

      {
        label: 'Total Routines',
        data: [],
        backgroundColor: 'rgb(5, 56, 107)',
      },
      {
        label: 'Completed Routines',
        data: [],
        backgroundColor: 'rgb(92, 219, 149)',
      },
    ],
  };
  const monthlyViewoptions = {
    maintainAspectRatio: false,
    responsive:false
  };
  const weeklyViewOptions ={
      maintainAspectRatio:false,
  }
  
const Analyze = () => {

    const [data,updateData] = useState({});
    const [chartWidth,updateChartWidth] = useState(1000);
    const [module,updateModule] = useState('routines');
    const [viewType,updateViewType]=useState('weekly');
    const [chartType,updateChartType]=useState('bar');


    useEffect(async()=>{
        let newData;

        try{
          if(module=='routines'){
            if(viewType==='weekly'){
              const routineTrack = (await getRoutinesWeeklyAnalysis()).data;

              routineTrack.map((item)=> {
                const day =( new Date(item.date).getDay()||7)-1; 
                WeeklyRoutinesData.datasets[0].data[day] = item.totalCount        
              });
              routineTrack.map((item)=>{
                const day =( new Date(item.date).getDay()||7)-1; 
                WeeklyRoutinesData.datasets[1].data[day] = item.completedCount        
              });
              newData = WeeklyRoutinesData;
            }
            else{
              const routineTrack = (await getRoutinesMonthlyAnalysis()).data;
              routineTrack.map((item)=> {
                const date =( new Date(item.date).getDate())-1;
                MonthlyRoutinesData.datasets[0].data[date] = item.totalCount;
              });
              routineTrack.map((item)=>{
                const date =( new Date(item.date).getDate())-1;
                MonthlyRoutinesData.datasets[1].data[date] =item.completedCount;
              });
              newData = MonthlyRoutinesData;
            }
          }
          else{
            if(viewType==='weekly'){
              const taskTrack = (await getTasksWeeklyAnalysis()).data; 
              taskTrack.map((item)=> {
                const day =( new Date(item.date).getDay()||7)-1; 
                WeeklyTasksData.datasets[0].data[day] = item.totalCount;
              });
              taskTrack.map((item)=>{
                const day =( new Date(item.date).getDay()||7)-1; 
                WeeklyTasksData.datasets[1].data[day] = item.completedCount;
              });
              newData = WeeklyTasksData;
            }
            else{
              const taskTrack = (await getTasksMonthlyAnalysis()).data;
              taskTrack.map((item)=> {
                const date =( new Date(item.date).getDate())-1;
                MonthlyTasksData.datasets[0].data[date] = item.totalCount;
              });
              taskTrack.map((item)=> {
                const date =( new Date(item.date).getDate())-1;
                MonthlyTasksData.datasets[1].data[date] = item.completedCount;
              });
              newData = MonthlyTasksData;
            }
          }
      updateData(newData);
    }
    catch(e){}
        
    },[module,viewType])

    const onModuleChange = (event) =>{
        updateModule(event.target.value);
    }
    const onViewTypeChange = (event) =>{
        const newView = event.target.value
        updateViewType(newView);
        let newChartWidth = (newView==='weekly' ? 350 : 1000);
        console.log(newChartWidth,"chaty tyye",newView);
        updateChartWidth(newChartWidth);
    }

    const onChartTypeChange =(event) =>{
        updateChartType(event.target.value);
    }

    return (
        <div className="container" style={{height:"100%"}}>
            <div className="d-flex justify-content-between">
            <div>
                <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
                    <label htmlFor="routines" className="btn btn-custom-toggle shadow-none active" >
                        <input type="radio" name="options" id="routines" value="routines" checked={module==="routines"} onChange={onModuleChange}/>
                            Daily Routines
                    </label>
                    <label htmlFor="tasks" className="btn btn-custom-toggle shadow-none" >
                        <input type="radio" name="options" id="tasks"  value="tasks" checked={module==="tasks"} onChange={onModuleChange} />
                            Tasks
                    </label>
                </div>
            </div>
            <div>
                <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
                    <label htmlFor="weekly" className="btn btn-custom-toggle shadow-none active" >
                        <input type="radio" name="options" id="weekly" value="weekly" checked={viewType==="weekly"} onChange={onViewTypeChange}/>
                        <i class="fas fa-calendar-week "></i>
                    </label>
                    <label htmlFor="monthly" className="btn btn-custom-toggle shadow-none" >
                        <input type="radio" name="options" id="monthly"  value="monthly" checked={viewType==="monthly"} onChange={onViewTypeChange} />
                        <i class="fas fa-calendar-alt"></i>
                    </label>
                </div>
            </div>
            </div>
            <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
                    <label htmlFor="bar" className="btn btn-custom-toggle shadow-none active" >
                        <input type="radio" name="options" id="bar" value="bar" checked={chartType==="bar"} onChange={onChartTypeChange}/>
                        <i class="fas fa-chart-bar"></i>
                    </label>
                    <label htmlFor="line" className="btn btn-custom-toggle shadow-none" >
                        <input type="radio" name="options" id="line"  value="line" checked={chartType==="line"} onChange={onChartTypeChange} />
                        <i class="fas fa-chart-line"></i>
                    </label>
                </div>
                <div style={{textAlign:"center"}}><br/><h5>{viewType=="weekly"?"Weekly":"Monthly"} Analysis of {module=="routines"?"Dailyroutines":"Tasks"}</h5></div>

            <div>
                <div style={{overflowX:"auto",height:"500px"}}>
                    {
                        chartType ==='bar' && viewType === 'monthly' && <Bar data={data} width={1110}  height={300} options={monthlyViewoptions} />
                    }
                    {
                        chartType ==='bar' && viewType === 'weekly' && <Bar data={data}   width={350} height={300} options={weeklyViewOptions} />
                    }
                    {
                        chartType ==='line' && viewType === 'monthly' && <Line data={data}  width={1110}  height={300} options={monthlyViewoptions} />
                    }
                    {
                        chartType ==='line' && viewType === 'weekly' && <Line data={data}   width={350} height={300} options={weeklyViewOptions} />
                    }
                </div>
            </div>
        </div>
        
    );
}
 
export default Analyze;