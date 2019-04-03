import React from 'react';
import Figures from "../Figures";

class Circle extends React.Component{

    constructor(props) {
        super(props);
        this. state = {
            a: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.addCircle = this.addCircle.bind(this);
      }
    
      handleChange(event) {
        this.setState({a: event.target.value});      
      }

      addCircle() {
           var a = this.state.a; var obj ;
        if (a>0){
            obj = new Figures.Circle(a);
        }else{
            alert("Радиус должен быть больше 0");
        } 
         this.props.addFigures("c" , obj); 
      }

      render(){
          return(
            <div className="figure"><p>Введите радиус</p>
                <form action="" className="">
                    <input className="form-control" type="number" placeholder="Радиус" onChange={this.handleChange}/>
                </form>
            <button className="btn btn-success " onClick={ () => this.addCircle() }>Добавить</button>
            </div>
          )
      }
}

export default Circle