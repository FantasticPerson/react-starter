/**
 * Created by dandan.wu on 16/9/27.
 */
import React,{Component,createClass} from 'react'
import ScrollContainer from './ScrollContainer'
import SlideMenuItem from './SlideMenuItem'

export default class SlideMenu extends Component{
    constructor(){
        super();
        let height = window.innerHeight;
        this.state = {height:height-190};
    }

    handleResize(){
        let height = window.innerHeight;
        this.setState({height:height-190});
        console.log(height);
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    renderMenuList(){
        const {classNames} = this.props;
        return classNames.map((name,index)=>{
            return <SlideMenuItem className={name} key={index}/>
        });
    }

    render(){
        return(
            <div className="slide-menu-container">
                <div className="up-arrow"></div>
                <div>
                    <ScrollContainer style={{width:83,height:this.state.height,marginTop:0}}>
                        {this.renderMenuList()}
                    </ScrollContainer>
                </div>
                <div className="down-arrow"></div>
            </div>
        )
    }
}