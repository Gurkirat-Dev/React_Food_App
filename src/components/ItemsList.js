import ItemListDetails from "./ItemListDetails";
import { BestSellerItemsList } from "./ItemListDetails";

const ItemsList = ({ data }) => {
  const Promoted = BestSellerItemsList(ItemListDetails);
  return (
    <div>
      {data &&
        data.map((item) => {
          const { id, ribbon } = item.card.info;
          const {text} = ribbon

          return text ? (
            <Promoted key={id} item={item} />
          ) : (
            <ItemListDetails key={id} item={item} />
          );
        })}
    </div>
  );
};

export default ItemsList;
