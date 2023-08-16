import { useEffect, useState } from 'react';
import List from './List';
import './Search.css'
import AddButton from './AddButton';
import { useQuery, gql } from '@apollo/client';
import './GestionProduct.css';
import { InputChangeEventDetail, IonSearchbar } from '@ionic/react';

const PROD = gql`
query fetchProduct($name: String!) {
    products(where: {name: {_gt: $name}}) {
      price
      quantity
      name
      id
    }
  }
`;

function GestionProduct() {
    const [filterName, updateFilter] = useState('');
    const { data, refetch } = useQuery(PROD);
    const [items, setItems] = useState<Product[]>([]);
    interface Product {
        name: string;
        price: number;
        quantity: number;
        id: string;
    }

    useEffect(() => {
        if (data) {
            setItems(data.products);
        } else {
            refetch({
                name: filterName,
            })
        }
    }, [data]);


    const handleChildEventUpdate = (response: Product) => {
        let index = items.findIndex(i => i.id === response.id)
        let copyItems = [...items]
        if (index >= 0) {
            copyItems[index] = response
        }
        setItems(copyItems);
    };

    const handleChildEventDelete = (response: string) => {
        let idProd = response;
        if (idProd) {
            setItems(items.filter((i: Product) => i.id !== idProd));
        }
    };

    const handleChildEvent = (response: Product) => {
        setItems([response, ...items]);
    };
  
    const searchProduct = async (searchValue: any) => {
        updateFilter(searchValue.detail.value)
        refetch({
            name: searchValue.detail.value
        })
    };

    return (
        <div className='card-form'>
            <div className='title'>GESTION DU PRODUITS</div>
            <div className='search-add-block'>
                <IonSearchbar placeholder="Chercher ..." className='search' onIonInput={(e: CustomEvent<InputChangeEventDetail>) => searchProduct(e)}></IonSearchbar>
                <AddButton CountProduct={items.length} handleEvent={handleChildEvent} />
            </div>
            <List products={items} handleEventUpdate={handleChildEventUpdate} handleEventDelete={handleChildEventDelete} />
        </div>
    );
}
export default GestionProduct;
