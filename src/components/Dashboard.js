import React from 'react'
import {firebase} from '../base.js'
import request from 'request'
import cheerio from 'cheerio'

export default class Dashboard extends React.Component{
  constructor(props){
    super()
    this.state = {

    }
  }

  handleAddItemChange = (event) => {
    this.setState({newItem: event.target.value});
  }

  addItem = (event) => {
    event.preventDefault()
    firebase.database().ref('/to-do-list').push({
      item: this.state.newItem,
      uid: this.props.uid
    })
    document.getElementById("add-item-form").reset();
  }

  deleteItem = (key) => {
    firebase.database().ref('/to-do-list').child(key).remove();
  }


  scrapeBleacherReport = () => {
       console.log('Scraping Bleacher Report\n==================================================');

       var bleacherReportArticles = [];

       request("https://bleacherreport.com", (error, response, html) => {
           var $ = cheerio.load(html)

           $('.articleSummary').each(function () {
               var title = $(this).children('.commentary').children('h3').text();
               // console.log(title);
               var img = $(this).children('.articleMedia').children('a').children('img').attr('src');
               // console.log(img);
               var link = $(this).children('.articleMedia').children('a').attr('href');
               // console.log(link);
               var newArticle = {
                   title: title,
                   img: img,
                   link: link
               }
               bleacherReportArticles.push(newArticle);

           });

           console.log("bleacher articles:", bleacherReportArticles);
           firebase.database().ref('/scaped-sites').push({
             screpedData: bleacherReportArticles,
             uid: this.props.uid
           })
           // this.setState({ data: bleacherReportArticles }, () => console.log(this.state));
       });
   }

  render(){

    const listItems = this.props.items.map((eachItem, key) =>
      <p key={eachItem.key}>{eachItem.item} <button onClick={() => this.deleteItem(eachItem.key)}>x</button></p>
    );

    /// here
    const listSites = this.props.sites.map((eachItem, key) =>
      <p key={eachItem.key}>{eachItem.screpedData[0]} <button onClick={() => this.deleteItem(eachItem.key)}>x</button></p>
    );

    return (
      <div>
        {/* Authorization  */}
       <div id="to-do-list" className="dashed-container">


         <form id="add-item-form" onSubmit={this.addItem}>
           <h3>To do list</h3>
           <input value={this.state.value} onChange={this.handleAddItemChange} type="text" placeholder="to do item" required></input>
           <button type="submit">Add item</button>
         </form>


         <button type="button" onClick={this.scrapeBleacherReport}>Scrape Bleacher</button>

         <div id="to-do-list-items">{listItems}</div>

         {/* here */}
         {/* {listSites} */}

       </div>
      </div>
    )
  }
}
