import React,{useState,useEffect} from 'react';
import { IonButton, IonToast } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';

import '../main.css';
interface Props {
    title:string,
    isToastVisible:boolean
}

function ToastComponent(props:Props) {
    useEffect(() => {
        setToastVisible(props.isToastVisible)
    }, [props.isToastVisible]);
    const [isToastVisibleLocal, setToastVisible] = useState(false);
  return (
    <>
      <IonToast
         isOpen={isToastVisibleLocal}
        trigger="open-toast"
        duration={500}
        message={props.title}
        cssClass="custom-toast"
        position='top'
        icon={checkmarkDoneOutline}
      ></IonToast>
    </>
  );
}
export default ToastComponent;