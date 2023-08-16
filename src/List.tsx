import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import './List.css';
import ModifyIcon from './ModifyIcon';
import DeleteIcon from './DeleteIcon';

interface Product {
  name: string;
  price: number;
  quantity: number;
  id:string
}

interface Props {
  products: Product[];
  handleEventUpdate: (response: Product) => void;
  handleEventDelete: (response: string) => void;

}

function List(props: Props) {
  const [items, setItems] = useState<Product[]>([]);
  const UpChildEvent = (response: Product) => {
    props.handleEventUpdate(response)
};

const DelChildEvent = (response: string) => {  
    props.handleEventDelete(response)
};

  useEffect(() => {
    setItems(props.products);
  }, [props.products]);

  return (
    <IonContent className='list'>
      <IonList>
        <IonItem className='col-title'>
          <IonLabel>Nom</IonLabel>
          <IonLabel>Prix unitaire</IonLabel>
          <IonLabel>Quantité</IonLabel>
          <IonLabel></IonLabel>
        </IonItem>
        {items.map((item, index) => (
          <IonItem key={index} className='item-form'>
            <IonLabel>{item.name}</IonLabel>
            <IonLabel>{item.price}</IonLabel>
            <IonLabel>{item.quantity}</IonLabel>
            <IonLabel >
              <div className="update-delete-button">
              <ModifyIcon selectedProduct={item} UpEvent={UpChildEvent}/>
              <DeleteIcon ProductId={item.id} DelEvent={DelChildEvent}/>
            </div></IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
}

export default List;
