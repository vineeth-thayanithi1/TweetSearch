import React from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBar from 'material-ui-search-bar'
import {AppBar, Toolbar, Checkbox,Typography, FormGroup, FormControlLabel } from '@material-ui/core';
import { Tab, Card } from 'semantic-ui-react'	
import { map} from 'underscore'	
import { Chart } from "react-google-charts";
import _ from 'lodash'
import moment from 'moment' 

const divStyle = {
  margin: '5px',
  marginLeft: '20px',
  margintop:'120px',
  border: '0px solid blue'
};
const pStyle = {
  fontSize: '20px',
  fontfamily: 'lucida grande'
};

const linkStyle = {	
  fontSize: '12px'	
};

const card = (x,i) => {	
  // console.log(x,i);	
  return (	
    <div>
    <Card.Group key={i}>	
      <Card fluid color='blue' >	
        <div style={divStyle}>	
          <div>	
            <p style={{fontSize:'20px'}}>{x.user_name}</p>	
            <p style={pStyle}>{x.tweet_text}</p>	
            <a href={"https://www.twitter.com/"+x.screen_name+"/status/"+x.id} style={linkStyle}>https://www.twitter.com/{x.screen_name}/status/{x.id}</a>	
          </div>	
        </div>	
      </Card>	
    </Card.Group>	
    </div>	
  )	
}

const Tab1 = (data) => {	
	// console.log(data);	
  const result = data.data;	
  // console.log(result);	
  if(result.length > 0)	
  {
    return result.map((x, i) => card(x,i));	
  }
  else
  {
    return (<p style={{fontSize:'20px'}}>No Results Found</p>);	
  }
  	
}	
var styles = { marginTop: '63px', marginLeft: '221px'};	
const styleLink = document.createElement("link");	
styleLink.rel = "stylesheet";	
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";	
document.head.appendChild(styleLink);

class NavBar extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
        queryfield: '',
        data: [],
        country: [],
        lang: [],
        authen: [],
        filteredArr: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLang = this.handleChangeLang.bind(this);
    this.handleChangeCoun = this.handleChangeCoun.bind(this);
    this.handleChangeAuthen = this.handleChangeAuthen.bind(this);
    this.Tab2 = this.Tab2.bind(this);
 
}

handleChangeCoun(checked, country){
  let temp = []
  // console.log(checked,country);
  if (checked) {
    temp = this.state.country.concat(country);
    this.setState({ country: temp });
    // console.log('checknew',temp);
  }
  else
  { 
    var array = this.state.country.filter(function(item) {
      return item !== country
    });   
    temp = array
    this.setState({ country: temp })
    // console.log('unchecknew',temp);
  }
  if (temp.length > 0) {
    let arr = [];
    let arr1 = [];
    var i;
    for(i = 0; i < temp.length; i++) {
      arr1 = _.filter(this.state.data, [ 'Country', [temp[i]]]);
      arr = arr.concat(arr1)
    }
    // console.log(arr);
    this.setState({ filteredArr: arr });
    // console.log('filter',filteredArr)
  }
}

handleChangeLang(checked, lang){
  let temp = []
  if (checked) {
    temp = this.state.lang.concat(lang);
    this.setState({ lang: temp });
  }
  else
  { 
    var array = this.state.lang.filter(function(item) {
      return item !== lang
    });   
    temp = array
    this.setState({ lang: temp })
  }
  if (temp.length > 0) {
    let arr = [];
    let arr1 = [];
    var i;
    for(i = 0; i < temp.length; i++) {
      arr1 = _.filter(this.state.data, [ 'lang', [temp[i]]]);
      arr = arr.concat(arr1)
    }
    // console.log('arrlangprint',arr);
    this.setState({ filteredArr: arr });
    // console.log('filteredarrpritlang',filteredArr);
  }
}

handleChangeAuthen(checked, authen){
  let temp = []
  // console.log(checked,authen);
  if (checked) {
    temp = this.state.authen.concat(authen);
    this.setState({ authen: temp });
    // console.log(temp);
  }
  else
  { 
    var array = this.state.authen.filter(function(item) {
      return item !== authen
    });   
    temp = array
    this.setState({ authen: temp })
    // console.log(temp);
  }
  if (temp.length > 0) {
    let arr = [];
    let arr1 = [];
    arr1 = _.filter(this.state.data, [ 'verified', [true]]);
    arr = arr.concat(arr1)
    // console.log('arrprint',arr);
    this.setState({ filteredArr: arr });
    // console.log(filteredArr);
  }
}

handleSubmit(event) {
  // event.preventDefault();
  // console.log(this.state.queryfield);
  fetch('http://127.0.0.1:5000/search', {
    method: 'POST',
    body: JSON.stringify({queryfield: this.state.queryfield})
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data); 
      this.setState({ data: data, filteredArr: data })});
}

Tab2() {
  const Arr= map(this.state.filteredArr,(d)=> d['Country']);
    // Arr.forEach(function(item, index, array) {
      var i; var Ind=0;
      var Braz = 0;
      var US = 0;
      var str1= "India";
      var str2 = "Brazil";
      var str3 = "USA";
      
      // console.log(Arr);
      for(i=0; i < Arr.length; i++)
      {      
      if((str1.localeCompare(Arr[i])) == 0)
      {
        Ind++;
        // console.log(Ind);
      }
      else if((str2.localeCompare(Arr[i])) == 0)
       {
        Braz++;
        // console.log(Braz);
      }
      else if((str3.localeCompare(Arr[i])) == 0)
      {
        US++;
      }

    }
    const langArr= map(this.state.filteredArr,(d)=> d['lang']);
    // Arr.forEach(function(item, index, array) {
      var i; var pt = 0; var other = 0;
      var en = 0;
      var hi = 0;
      var str1= "pt";
      var str2 = "en";
      var str3 = "hi";
      
      // console.log(Arr);
      for(i=0; i < langArr.length; i++)
      {      
      if((str1.localeCompare(langArr[i])) == 0)
      {
        pt++;
        // console.log(Ind);
      }
      else if((str2.localeCompare(langArr[i])) == 0)
       {
        en++;
        // console.log(Braz);
      }
      else if((str3.localeCompare(langArr[i])) == 0)
      {
        hi++;
      }
      else
      {
        other++
      }

    }
    const SentimentArr= map(this.state.filteredArr,(d)=> d['sentiment_val']);
    // Arr.forEach(function(item, index, array) {
      var i; var neu = 0; var other = 0;
      var pos = 0;
      var neg = 0;
      var str1= "positive";
      var str2 = "negative";
      var str3 = "neutral";
      
      //console.log(Arr);
      for(i=0; i < SentimentArr.length; i++)
      {     
      if((str1.localeCompare(SentimentArr[i])) == 0)
      {
        pos++;
        // console.log(Ind);
      }
      else if((str2.localeCompare(SentimentArr[i])) == 0)
       {
        neg++;
        // console.log(Braz);
      }
      else if((str3.localeCompare(SentimentArr[i])) == 0)
      {
        neu++;
      }
    }

    const Arr2= map(this.state.data,(d)=> d['tdate']);
    var i; var str1 = "2010", str2 = "2011", str3 = "2012", str4 = "2013", str5 = "2014", str6 = "2015", str7 = "2016", str8 = "2017", str9 = "2018",
    str0 = "2019"; var c1=0, c2=0, c3=0, c4=0, c5=0, c6=0, c7=0, c8=0, c9=0, c0=0;
    console.log(Arr2);
    let res = 0;
    for(i = 0; i< Arr2.length; i++)
    {
      var year = moment(Arr2[i][0]).format('YYYY');
    //var res1 = Arr2[i][0];
    // var res = res1.charAt(3);
    //res = res1.split("-")
    //console.log(res1, res);
    // var year = res[0];
    if((str1.localeCompare(year) == 0))
      c1++;
      // console.log('count',c1);
    else if((str2.localeCompare(year)) == 0)
    c2++;
    else if((str3.localeCompare(year)) == 0)
    c3++;
    else if((str4.localeCompare(year)) == 0)
    c4++;
    else if((str5.localeCompare(year)) == 0)
    c5++;
    else if((str6.localeCompare(year)) == 0)
    c6++;
    else if((str7.localeCompare(year)) == 0)
    c7++;
    else if((str8.localeCompare(year)) == 0)
    c8++;
    else if((str9.localeCompare(year)) == 0)
    c9++;
    else if((str0.localeCompare(year)) == 0)
    c0++;
    }

  return(
  <div>
  <div className={"Country-wise tweet visualization"} style={{display: "inline-block"}}>
  <Chart
  width={'300px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Country', 'Tweet Count'],
    ['India', Ind],
    ['USA', US ],
    ['Brazil', Braz],
    
  ]}
   options={{
     title: 'Country Classification',
   }}
 
  />          
</div>

<div className={"Language-wise tweet visualization"} style={{display: "inline-block"}}>
          <Chart
          width={'300px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Language', 'Tweet Count'],
            ['Hindi', hi],
            ['English', en ],
            ['Portugese', pt],
            ['Other Language', other],
            
          ]}
           options={{
             title: 'Language Classification',
           }}
         
          />          
      </div>

  <div className={"Tweet Sentiment visualization"} style={{display: "inline-block"}}>
  <Chart
  width={'300px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Sentiment', 'Tweet Count'],
    ['Positive', pos],
    ['Negative', neg ],
    ['Neutral', neu],
    
  ]}
   options={{
     title: 'Sentiment  Classification',
   }}
 
  />          
</div>

<div className={"Time series analysis"} style={{display: "inline-block"}, {margin: "150px"}}>
  
<Chart
  width={'600px'}
  height={'400px'}
  chartType="LineChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Year', 'Tweet Count'],
    [2010, c1],
    [2011, c2],
    [2012, c3],
    [2013, c4],
    [2014, c5],
    [2015, c6],
    [2016, c7],
    [2017, c8],
    [2018, c9],
    [2019, c0],
   
  ]}
  options={{
    hAxis: {
      title: 'Year',
    },
    vAxis: {
      title: 'Tweet Trend',
    },
      title: 'Time Series Analysis'
    
  }
  
}
  rootProps={{ 'data-testid': '1' }}
/>
</div>
      </div>)
}
  render() {
    const panes = [	
		  { menuItem: 'Search Results', render: () => <div> <Tab.Pane> <Tab1 data={this.state.filteredArr}/> </Tab.Pane> </div>},	
		  { menuItem: 'Search Analytics', render: () => <Tab.Pane>{this.Tab2()}</Tab.Pane> },	
		]
    var paneStyle= { position: 'fixed', top: 65, bottom: 0, left: 0, width: '220px',height: '100%', overflow: 'hidden',background: '#eee' }
    var check= {color: 'blue'}
    return(
      <div>
          <AppBar>
          <Toolbar>
                <Typography variant="h5" color="inherit">
                Tweet Search
                </Typography>
                <MuiThemeProvider>
                <SearchBar
                  value ={this.state.queryfield}
                  onChange={(val) =>  this.setState({queryfield: val})}
                  onRequestSearch={this.handleSubmit}
                  style={{
                    margin: '0 auto',
                    minWidth: 1200,
                  }}
                />
                </MuiThemeProvider>
          </Toolbar>          
          </AppBar>
    <nav id="nav" style={paneStyle}>
			<div className="innertube">
      <h1>Filters</h1>
			<h2>Country</h2>
      <FormGroup row>
      <FormControlLabel control={<Checkbox onChange={(e,checked) => this.handleChangeCoun(checked,'India')} style={check} value="India"/>} label="India"/>
      <FormControlLabel control={<Checkbox onChange={(e,checked) => this.handleChangeCoun(checked,'USA')} style={check} value="USA"/>} label="USA"/>
      <FormControlLabel control={<Checkbox onChange={(e,checked) => this.handleChangeCoun(checked,'Brazil')} style={check} value="Brazil"/>} label="Brazil"/>
      </FormGroup>

      <h2>Language</h2>
      <FormGroup row>
      <FormControlLabel control={<Checkbox onChange={(e,checked) => this.handleChangeLang(checked,'hi')} style={check} value="Hindi"/>} label="Hindi"/>
      <FormControlLabel control={<Checkbox onChange={(e,checked) => this.handleChangeLang(checked,'en')} style={check} value="English"/>} label="English"/>
      <FormControlLabel control={<Checkbox onChange={(e,checked) => this.handleChangeLang(checked,'pt')} style={check} value="Portugese"/>} label="Portugese"/>
      </FormGroup>

      <h2>Authenticity</h2>
      <FormGroup row>
      <FormControlLabel control={<Checkbox onChange={(e,checked) => this.handleChangeAuthen(checked,'true')} style={check} value="Verified"/>} label="Verified"/>
      </FormGroup>
      </div>
      </nav>                     
      <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} style={styles} />
      </div>
    )
  }
}

export default NavBar;
