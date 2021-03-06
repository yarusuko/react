import React from 'react';
import Figures from "../Figures";
import {Form, Button } from "react-bootstrap"
import { Redirect}  from 'react-router-dom';

class Rectangle extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            a: "0",
            b: "0",
            aIsValid: '',
            bIsValid: '',
            redirectToNewPage: false,
            idd:0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillInputs   = this.fillInputs.bind(this);  
      }
    
     
      handleChange(event) {
          var id = event.target.id;
          var valueA, valueB;
          if(id === "a"){
            valueA = event.target.value
            this.setState({aIsValid:true}) 
              if(+valueA > 0) {
                
              } else {
                this.setState({aIsValid:false})
              }
              this.setState({a: valueA}); 
          }else{
            valueB = event.target.value
            this.setState({bIsValid:true})  
              if( +valueB > 0 ){
              }else {
                this.setState({bIsValid:false})
              }
              this.setState({b: valueB});
          }
      }
      fillInputs(){
        var a= new URLSearchParams(this.props.location.search).get("a")
        if(a){
          a = a.split(",")
          this.setState({a:a[0],b:a[1]});
        }
      }
      handleSubmit(event,id) {
        const { aIsValid,bIsValid } = this.state;
            event.preventDefault();
            event.stopPropagation();
            var a = this.state.a; 
            var b = this.state.b;
            var obj =  new Figures.Rectangle(a,b);        
            if(aIsValid && bIsValid){
              if(id === null){
                this.props.addFigures(`http://localhost:3003/`, "rectangle" , obj.calcArea(),[a,b]); 
              }else{
                this.props.editFigures(`http://localhost:3003/${id}`, obj.calcArea(),[a,b] );
              }
              this.setState({ redirectToNewPage: true, a:"0",b:"0" })
              this.props.show(`http://localhost:3003/showRecycle/${id}`);
            }
      }
      componentDidMount(){
        var a= new URLSearchParams(this.props.location.search).get("a")
        if(a){
          a = a.split(",")
          this.setState({a:a[0],b:a[1]});
        }
      }
      componentWillUnmount(){
          if(this.state.idd !== null){
          this.props.show(`http://localhost:3003/showRecycle/${this.state.idd}`);
          }
      }              
      render(){
        if (this.state.redirectToNewPage) {
          this.setState({ redirectToNewPage: false })
          this.setState({aIsValid:  "",bIsValid:  ""});
          return (
            <Redirect to="/rectangle"/>
            )
        }
        const { aIsValid,bIsValid } = this.state;
        var classtextA = "",classtextB = "";
        
        if(typeof(aIsValid) === "boolean"){
          aIsValid ? classtextA = 'is-valid': classtextA ='is-invalid'
        }
        if(typeof(bIsValid) === "boolean"){
          bIsValid ? classtextB = 'is-valid': classtextB ='is-invalid'
        }       
        var id = new URLSearchParams(this.props.location.search).get("id")
          if(id !== this.state.idd){
            this.setState({idd:id})
            this.props.show(`http://localhost:3003/showRecycle/${this.state.idd}`);
        }  
        return (
          <Form onSubmit={e => this.handleSubmit(e,id)} onMouseEnter={this.fillInputs}
          >
              <Form.Group  md="4">
                <Form.Label>Введите координаты</Form.Label>
                <Form.Control
                  className ={classtextA}
                  required
                  type="number"
                  placeholder="Сторона a"
                  value = {this.state.a}
                  onChange = {this.handleChange}
                  id = "a"
                />
                <Form.Control.Feedback type = {aIsValid ? "valid" : "invalid"}>
                {aIsValid ? "Данные корректны" : "Длинна стороны должна быть больше нуля"}
                </Form.Control.Feedback>
                </Form.Group> 
                <Form.Group  md="4">    
                <Form.Control
                  className ={classtextB}
                  required
                  type="number"
                  placeholder="Сторона b"
                  value = {this.state.b}
                  onChange = {this.handleChange}
                  id = "b"
                />
                <Form.Control.Feedback type = {bIsValid ? "valid" : "invalid"}>
                {bIsValid ? "Данные корректны" : "Длинна стороны должна быть больше нуля"}
                </Form.Control.Feedback>
                </Form.Group> 

                <Button
                  className = "btn btn-success" 
                  type="submit" 
                  disabled = {aIsValid && bIsValid ? false : true}>
                  {id ?  "Изменить" : "Добавить"  }
                </Button>
           
                {id ? <Button className = "btn btn-danger" 
                        onClick = {()=>{
                          this.setState({ redirectToNewPage: true, a:"",b:"" })
                          this.props.show();
                          }}> 
                        Отмена 
                      </Button>: " "  
                }
           </Form>
        )
      }
       
}

export default Rectangle