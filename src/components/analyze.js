import React,{useState,useEffect} from 'react';
import Chart from "react-google-charts";
import {Bar,Line} from "react-chartjs-2"

const WeeklyTasksData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri','Sat','Sun'
    //  '6','7','8','9',
    // '10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'
],
    datasets: [

      {
        label: 'Total Tasks',
        data: [5, 10, 7, 6, 2, 8, 4,],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Completed Tasks',
        data: [2, 5, 3, 5, 2, 7, 4,],
        backgroundColor: 'rgb(75, 192, 192)',
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
        data: [9, 12, 6, 8, 4, 10, 7,],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Completed Routines',
        data: [7, 7, 5, 7, 1, 6, 7,],
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };
  const MonthlyTasksData = {
    labels: ['1', '2', '3', '4', '5','6','7','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
    datasets: [

      {
        label: 'Total Tasks',
        data: [2, 10, 12, 5, 1, 8, 9, 4, 10, 8, 9, 3, 11, 3, 9, 4, 2, 3, 9, 5, 2, 3, 11, 5, 1, 4, 2, 3, 6, 5,],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Completed Tasks',
        data: [2, 9,  10, 3, 1, 6, 4, 2, 9, 7, 6, 2, 5, 2, 7, 2, 1, 2, 3, 4, 2, 5, 6, 1, 4, 2, 3, 6, 4,5,],
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };
  const MonthlyRoutinesData = {
    labels: ['1', '2', '3', '4', '5','6','7','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
    datasets: [

      {
        label: 'Total Routines',
        data: [2, 10, 12, 5, 1, 8, 9, 4, 10, 8, 9, 3, 11, 3, 9, 4, 2, 3, 9, 5, 2, 3, 11, 5, 1, 4, 2, 3, 6, 5,],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Completed Routines',
        data: [2, 9,  10, 3, 1, 6, 4, 2, 9, 7, 6, 2, 5, 2, 7, 2, 1, 2, 3, 4, 2, 5, 6, 1, 4, 2, 3, 6, 4,5,],
        backgroundColor: 'rgb(75, 192, 192)',
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


    useEffect(()=>{
        let newData;
        if(module=='routines'){
            newData =(viewType==='weekly') ? WeeklyRoutinesData : MonthlyRoutinesData;
        }
        else{
            newData =(viewType==='weekly') ? WeeklyTasksData : MonthlyTasksData;
        }
        updateData(newData);
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
                    <label htmlFor="routines" className="btn btn-primary shadow-none active" >
                        <input type="radio" name="options" id="routines" value="routines" checked={module==="routines"} onChange={onModuleChange}/>
                            Daily Routines
                    </label>
                    <label htmlFor="tasks" className="btn btn-primary shadow-none" >
                        <input type="radio" name="options" id="tasks"  value="tasks" checked={module==="tasks"} onChange={onModuleChange} />
                            Tasks
                    </label>
                </div>
            </div>
            <div>
                <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
                    <label htmlFor="weekly" className="btn btn-primary shadow-none active" >
                        <input type="radio" name="options" id="weekly" value="weekly" checked={viewType==="weekly"} onChange={onViewTypeChange}/>
                        <i class="fas fa-calendar-week"></i>
                    </label>
                    <label htmlFor="monthly" className="btn btn-primary shadow-none" >
                        <input type="radio" name="options" id="monthly"  value="monthly" checked={viewType==="monthly"} onChange={onViewTypeChange} />
                        <i class="fas fa-calendar-alt"></i>
                    </label>
                </div>
            </div>
            </div>
            <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
                    <label htmlFor="bar" className="btn btn-primary shadow-none active" >
                        <input type="radio" name="options" id="bar" value="bar" checked={chartType==="bar"} onChange={onChartTypeChange}/>
                        <i class="fas fa-chart-bar"></i>
                    </label>
                    <label htmlFor="line" className="btn btn-primary shadow-none" >
                        <input type="radio" name="options" id="line"  value="line" checked={chartType==="line"} onChange={onChartTypeChange} />
                        <i class="fas fa-chart-line"></i>
                    </label>
                </div>
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