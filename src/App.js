import {useState} from "react";

//static items
// static items
// const initialItems = [
//   {id: 1, description: "Passports", quantity: 2, packed: false },
//   {id: 2, description: "Socks", quantity: 12, packed: true},
//   {id: 3, description: "Power Bank", quantity: 1, packed: true },
// ];

//parent component
export default function App() {
  //destructing array for states
  const [items, setItems] = useState([]);

  //handle add items to the state
  const handleAddItems = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  }

  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  //handle update items from the state
  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //render child components inside parent
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} 
      onRemoveItem={handleRemoveItem} 
      onUpdateItem={handleUpdateItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo() {
  return <h1>🤠To-do List👌</h1>
}

//child component Form
function Form({onAddItems}) {
  //destructing array for state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  //handle submission of form, by preventing its default behavior
  function handleSubmit(e) {
    e.preventDefault();

    //if empty description
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now(), dueDate};
    console.log(newItem); //testing new item data
    
    //store new item in array from parent state
    //called this function whenever form submitted
    onAddItems(newItem);

    //return this state
    setDescription("");
    setQuantity(1);
    setDueDate("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>List kegiatan-kegiatan kamu 😊</h3>
      {/* <select
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select> */}
      <input
      type="text"
      placeholder="Masukkan Kegiatan"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button>List</button>
    </form>
  );
}

//child component PackingList
function PackingList({items, onRemoveItem, onUpdateItem}) {
  return (
    <div className="list">
      <ol>
        {items.map((item) => (
          <Item item={item} 
          key={item.id} 
          onRemoveItem={onRemoveItem}
          onUpdateItem={onUpdateItem}/>
        ))}
      </ol>
    </div>
  );
}

function Item({item, onRemoveItem, onUpdateItem}) {
  const handleRemoveClick = () => {
    onRemoveItem(item.id);
  };
  return (
    <li>
      <input type="checkbox"
      value={item.packed}
      onChange={() => onUpdateItem(item.id)}/>
      {/* ternary operator to check simple condition */}
      {/* if item.packed === true then apply this style textDecoration: "line-through" else don't do anything*/}
      <span style={item.packed ? {textDecoration: "line-through" } : {}}>
        {item.description}. tanggal kegiatan : {item.dueDate}
      </span>
      <button onClick={handleRemoveClick}>🤥</button>
    </li>
  )
}

//child component Stats
function Stats({items}) {
  //jika tidak ada item pada array
  if (!items.length)
  return (
      <p className="stats">
      <em>
          Kamu tidak ada kegiatan hari ini😊
      </em>
      </p>
  );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
        ? "Kegiatan kamu sudah selesai🤗"
        : `🤔 Kamu punya ${numItems} kegiatan, dan sudah menyelesaikan ${numPacked}
        kegiatan (${percentage}%)`}
      </em>
    </footer>
  );
}