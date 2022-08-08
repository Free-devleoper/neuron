import { Card, LinearProgress, Stack } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from "react";

import BarChart from "examples/Charts/BarCharts/BarChart";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "examples/Footer";
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { IoBuild } from "react-icons/io5";
// React icons
import { IoIosRocket } from "react-icons/io";
import { IoWallet } from "react-icons/io5";
// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import Projects from "layouts/dashboard/components/Projects";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import Table from "examples/Tables/Table";
import VuiBox from "components/VuiBox";
// Vision UI Dashboard React components
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import VuiProgress from "components/VuiProgress";
import VuiTypography from "components/VuiTypography";
// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import authorsTableData from "./data/authorsTableData";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import colors from "assets/theme/base/colors";
import {fetchPrices} from './../../store/fetchDataSlice'
import { fetch_trainningMSE } from "store/fetchTrainningSlice";
//import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
//import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import linearGradient from "assets/theme/functions/linearGradient";
import projectsTableData from "layouts/tables/data/projectsTableData";
// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";

function Dashboard() {

const pred_colmns =[
  {"name":"Date",align:"center"},
  {"name":"Actual","align":"center"},
  {"name":"Predicted","align":"center"},
]
  const columns=[
    { name: "Date", align: "left" },
    { name: "open", align: "left" },
    { name: "high", align: "center" },
    { name: "low", align: "center" },
    { name: "close", align: "center" },
  ];
  const [rows,setRows] =useState([])
  const [pred_rows,setPredRows] =useState([])
  const { gradients } = colors;
  const { cardContent } = gradients;
  const home_state=useSelector(state=>state.fetch_data);
  const trainning_state=useSelector(state=>state.fetch_trainning);
  useEffect(()=>{
    // console.log(trainning_state);
    if(home_state.status=='loading'){
      // console.log('loading');
      handle_progress(50);
    }else if(home_state.status=='success' && home_state.data_status=='feteched'){
      handle_progress(100);
      handle_rows()
    }
    if(trainning_state.trainning_data_status=='loading' || trainning_state.trainning_data_status=='failed'){
      // console.log('loading');
      handle_progress_trainning(50);
    }else if(trainning_state.trainning_data_status=='success'){
      handle_progress_trainning(100);
      handle_trainning_data()
      handle_pred_data()
      handle_pred_act_rows()
    }
    return () => {
    }
  },[home_state,trainning_state])

  const dispatch=useDispatch();
  const [symbol,setSymbol]=useState('AAPL');
  const [start_date,setStartdate]=useState('');
  const [secoonds,setSeconds]=useState(0);
  const [end_date,setEndate]=useState('');
  const [trainnigprogress,setTrainningprogress]=useState(0);
  const [categories,setCategories]=useState([]);
  const [categories_pred,setCategories_pred]=useState([]);
  const [layers,setLayers]=useState([{layer:1,neurons:20}]);
  const [tarining_loss,setTraining_loss]=useState([]);
  const [act_values,setactValues]=useState([]);
  const [pred_values,setpredValues]=useState([]);
  const [linegraph,setLinegraph]=useState(false);
  const [validation_loss_,setValidation_loss]=useState([]);
  //Line Chart
  const handle_trainning_data=()=>{
    var arr=[]
    for(let i=1;i<=trainning_state.trainning_data.loss.length;i++){
    arr.push(i)
    }
    setCategories(arr)
    var arr_loss=trainning_state.trainning_data.loss
    arr_loss=arr_loss.map(function(each_element){
      return Number(each_element).toFixed(2).toString();
  });
  var val_losss=trainning_state.trainning_data.val_loss
  val_losss=val_losss.map(function(each_el){
    return Number(each_el).toFixed(2).toString();
  });
    setTraining_loss(arr_loss);
    setValidation_loss(val_losss);
    setLinegraph(true);
  }
  const handle_pred_data=()=>{
    var arr=[]
    const data_pred=JSON.parse(trainning_state.prediction_data)
    for(let i=1;i<=data_pred.length;i++){
    arr.push(i)
    // console.log("lengt of preed")
    }
    setCategories_pred(arr)
    let data_arr_actual=[]
    let data_arr_pred=[]
    for(let r of data_pred){
    data_arr_actual.push(Number(r.actual_values).toFixed(2).toString())
    data_arr_pred.push(Number(r.predicted_values).toFixed(2).toString())
    }
    setactValues(data_arr_actual);
    setpredValues(data_arr_pred);
  }
  var lineChartDataDashboard = [
    {
      name: "Trainning Loss",
      data: tarining_loss,
    },
    {
      name: "Validation Loss",
      data: validation_loss_,
    },
  ];
  var lineChartDataDashboard_pred = [
    {
      name: "Actual",
      data: act_values,
    },
    {
      name: "Prediction",
      data: pred_values,
    },
  ];
  var lineChartOptionsDashboard={chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "number",
    categories: categories,
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
  },
  legend: {
    show: true,
  },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#0075FF", "#2CD9FF"],
  },
  colors: ["#0075FF", "#2CD9FF"],
}
  
var lineChartOptionsDashboard_pred={chart: {
  toolbar: {
    show: false,
  },
},
tooltip: {
  theme: "dark",
},
dataLabels: {
  enabled: false,
},
stroke: {
  curve: "smooth",
},
xaxis: {
  type: "number",
  categories: categories_pred,
  labels: {
    style: {
      colors: "#c8cfca",
      fontSize: "10px",
    },
  },
  axisBorder: {
    show: false,
  },
  axisTicks: {
    show: false,
  },
},
yaxis: {
  labels: {
    style: {
      colors: "#c8cfca",
      fontSize: "10px",
    },
  },
},
legend: {
  show: true,
},
grid: {
  strokeDashArray: 5,
  borderColor: "#56577A",
},
fill: {
  type: "gradient",
  gradient: {
    shade: "dark",
    type: "vertical",
    shadeIntensity: 0,
    gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
    inverseColors: true,
    opacityFrom: 0.8,
    opacityTo: 0,
    stops: [],
  },
  colors: ["#0075FF", "#2CD9FF"],
},
colors: ["#0075FF", "#2CD9FF"],
}


  
  
  
  
  
  
  
  
  
  
  
  //CHANGE fUNCTIONS






const handle_progress_trainning=(val)=>{
  setTrainningprogress(val);
}
const diffYears=(dt1,dt2)=>{
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
 diff /= (60 * 60 * 24);
return Math.abs(Math.round(diff/365.25));
}

  const handle_Onchange_neuron=(e,index)=>{
    let new_layers=[...layers];
    if(e.target.name=='neurons'){
    new_layers[index][e.target.name]=parseInt(e.target.value);
    setLayers(new_layers);
    }
    }
    const handle_onClick_trainning =(e)=>{
      e.preventDefault();
      dispatch(fetch_trainningMSE({layer_data:layers,file_name:home_state.uid}));
      setLinegraph(false);
    }
    let add_layer=()=>{
      setLayers([...layers,{layer:layers.length+1,neurons:20}]);
      // console.log(layers);
    }
    let remove_layer=(i)=>{
    let new_layers=[...layers];
    new_layers.splice(i,1);
    setLayers(new_layers);
    }


  const handle_onClick=(e)=>{
    e.preventDefault();
    // console.log(start_date,end_date);
    if(start_date!=='' && end_date!==''){
      var dt1 = new Date(start_date);
      var dt2 = new Date(end_date);
      var today=new Date();
      var diffYears_in=diffYears(dt1,dt2);
      if(dt1>today || dt2>today){
        alert('Date Range should not be greater than today');
      }else if(diffYears_in<1){
        alert('Date difference should be greater than 1 year');
      }else{
        if(symbol!==''){
      dispatch(fetchPrices({"start_date":start_date,"end_date":end_date,"symbol":symbol}));
        }else{
          alert("Please enter symbol");
        }
      }
    }
    // dispatch(fetch_data({"start":start_date,"end":end_date}));
  }
  const handle_pred_act_rows=(e)=>{
    const data_pred=JSON.parse(trainning_state.prediction_data)
    var pred_rows_data=[]
    for(let r of data_pred){
      pred_rows_data.push(
      {
        Date:(
          <VuiTypography variant="caption" color="white" fontWeight="medium">
          {r.date}
        </VuiTypography>
        ),
        Actual:(
          <VuiTypography variant="caption" color="white" fontWeight="medium">
          {Number(r.actual_values).toFixed(2).toString()}
        </VuiTypography>
        ),
        Predicted:(
          <VuiTypography variant="caption" color="white" fontWeight="medium">
          {Number(r.predicted_values).toFixed(2).toString()}
        </VuiTypography>
        )
      })
    }
    setPredRows(pred_rows_data);
  }
  const handle_rows=()=>{
    const data_rows=JSON.parse(home_state.prices);
    const rows_data=[]
    for(let row of data_rows){
      rows_data.push(
        {
          Date: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {row.date}
            </VuiTypography>
          ),
          // function: <Function job="Programtor" org="Developer" />,
          open: (
            // <VuiBadge
            //   variant="standard"
            //   badgeContent="Offline"s
            //   size="xs"
            //   container
            //   sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            //     background: "unset",
            //     border: `${borderWidth[1]} solid ${white.main}`,
            //     borderRadius: borderRadius.md,
            //     color: white.main,
            //   })}
            // />
            <VuiTypography variant="caption" color="white" fontWeight="medium">
            {row.open}
          </VuiTypography>
          ),
          high: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {row.high}
              </VuiTypography>
          ),
          low: (
            <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          
              {row.low}
            </VuiTypography>
          ),
          close: (
            <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {row.close}
            </VuiTypography>
          ),
        })
    }
    setRows(rows_data)
  }
  const handle_progress=(pro)=>{
    setSeconds(pro);
  }
  const handle_Onchange=(e)=>{
    if(e.target.name==='start_date'){
      setStartdate(e.target.value);
    }else if(e.target.name==='end_date'){
      setEndate(e.target.value);
    }else if(e.target.name==='symbol'){
      setSymbol(e.target.value);
    }
  }
  return (
    <DashboardLayout>
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
          <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} md={12} xl={12} justifyContent={"center"} alignItems={"center"}>
            <VuiTypography variant="h6" color="text" mb={2}>
              Search Symbol 
                            </VuiTypography>
          <VuiInput
          name="symbol"
  type="Symbol" 
  placeholder="Symbol" value={symbol}
  size="medium"
  onChange={handle_Onchange}
/>
            </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <VuiTypography variant="h6" color="text" mb={2}>
              Start Date
              </VuiTypography>
          <VuiInput
          name="start_date"
  type="date" 
  placeholder="Date" value={start_date}
  onChange={handle_Onchange}
/>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
            <VuiTypography variant="h6" color="text" mb={2}>
              End Date
              </VuiTypography>
            <VuiInput
          name="end_date"
  type="date" 
  placeholder="Date" value={end_date}
  size="large"
  onChange={handle_Onchange}
  />
              </Grid>
              <Grid item xs={12} md={12} xl={3} container={true} justifyContent="center" width='100%' alignItems="right">
                
              <VuiButton variant="contained" onClick={handle_onClick} size="large" color="primary">Get Data in Range</VuiButton>
                </Grid>
              {<Grid item xs={12} md={12} xl={3}>
                <VuiProgress  value={secoonds}  />
                </Grid>
                }
            
           {home_state.data_status =="feteched" && <Grid item xs={12} lg={12} xl={5}>
            <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
               Prices Table Retrieved
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </VuiBox>
          </Card>
        </VuiBox>
              
              </Grid>
              }
             {(home_state.data_status=="feteched" && home_state.status!="failed")&&
             <Grid item xs={12} md={12} xl={12}>
            <VuiTypography variant="h3" color="text" mb={2}>
              Train Model
              </VuiTypography>
              
              </Grid>}
            
            {(home_state.data_status=="feteched" && home_state.status!="failed")&&layers.map((element,index)=>( 
              <>
            <Grid item xs={12} md={6} xl={3}>
            <VuiTypography variant="h6" color="text" mb={2}>
              Layers
              </VuiTypography>
            <VuiInput
          name="layers"
  type="text" 
  disbaled="true"
  placeholder="Layers" value={element.layer}
  size="large"
  /></Grid> <Grid item xs={12} md={6} xl={3}>
            <VuiTypography variant="h6" color="text" mb={2}>
              Number of Neurons at This Layer
              </VuiTypography>
          <VuiInput
          name="neurons"
  type="Number" 
  placeholder="Neurons" value={element.neurons.toString()}
  size="large"
  onChange={e=>handle_Onchange_neuron(e,index)}
/>
{/* <VuiButton variant="contained" onClick={remove_layer}  size="smalll" color="error">Remove Layer</VuiButton> */}
            </Grid></>))}
              {(home_state.data_status=="feteched" && home_state.status!="failed")&& <Grid item xs={12} md={12} xl={3} container={true} justifyContent="space-around" width='100%' alignItems="right">
              <VuiButton variant="contained" onClick={add_layer}  size="large" color="secondary">Add Layer</VuiButton>
              <VuiButton variant="contained" onClick={handle_onClick_trainning} size="large" color="primary">Train Model</VuiButton>
                  </Grid>
                  }
                  {(trainning_state.loading) && <Grid item xs={12} md={12} xl={3}>
                    
                 
                <VuiProgress  value={trainnigprogress}  />


                </Grid>
                }
            {/* <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                <VuiProgress  value={trainnigprogress}  />
                title={{ text: "Start Date", fontWeight: "regular" }}
                count={start_date}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoCalendar size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "End Date" }}
                count={end_date}
                // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoCalendar size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid> */}
          </Grid>
        </VuiBox>
        {/* <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox> */}
        <VuiBox mb={3}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
          {linegraph&&<Grid item xs={12} lg={12} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Model Loss
                  </VuiTypography>
                  {/* <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox> */}
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>}
            {/* trainning_state.trainning_data_status =="success" && */}
            {trainning_state.trainning_data_status=="success"&&<Grid item xs={12} lg={12} xl={5}>
            <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
              Actual vs Prediction
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={pred_colmns} rows={pred_rows} />
            </VuiBox>
          </Card>
        </VuiBox>
              
              </Grid>
              }


{linegraph&&<Grid item xs={12} lg={12} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                  Actual vs Prediction
                  </VuiTypography>
                  {/* <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox> */}
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard_pred}
                      lineChartOptions={lineChartOptionsDashboard_pred}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>}





           {false&&<Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    {/* <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Users
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32,984
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid> */}
                    {/* <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,42M
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid> */}
                    {/* <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,400$
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid> */}
                    {/* <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        320
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid> */}
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>}
          </Grid>
        </VuiBox>
        {/* <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid> */}
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
