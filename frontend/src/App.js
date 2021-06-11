import React,{Component} from 'react';
import './App.css';
import Main from './components/Main'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/ConfigureStore';
import "../node_modules/video-react/dist/video-react.css";

//Khởi tạo kho lưu trữ Redux để lưu trữ trạng thái của các đối tượng
//khi thao tác với web app
const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      //Thẻ Provider làm cho Redux store khả dụng cho hàm connect() khi
      //gọi đến các thành phần bên dưới trong cấu trúc phân cấp
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Main />    
            </div>
          </BrowserRouter>
        </Provider>
    );
  } 
}

export default App;
