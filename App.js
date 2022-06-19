import "antd/dist/antd.css";
import "./App.css";
import "./style.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "E Shtune",
      email: "Ferizaj / Prishtine",
      address: "18:45 - 20:00",
    },
    {
      id: 2,
      name: "E Shtune",
      email: "Ferizaj / Prishtine",
      address: "18:45 - 20:00",
    },
    {
      id: 3,
      name: "E Shtune",
      email: "Ferizaj / Prishtine",
      address: "18:45 - 20:00",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Day",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Club",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Time",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditGame(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteGame(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddGame = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newGame = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newGame];
    });
  };
  const onDeleteGame = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Game record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((Game) => Game.id !== record.id);
        });
      },
    });
  };
  const onEditGame = (record) => {
    setIsEditing(true);
    setEditingGame({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingGame(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddGame}>Add The Game</Button>
        <Table className="" columns={columns} dataSource={dataSource}></Table>
        <Modal 
          title="Edit Game"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((Game) => {
                if (Game.id === editingGame.id) {
                  return editingGame;
                } else {
                  return Game;
                }
              });
            });
            resetEditing();
          }}
        >
          Day<Input className="day"
            value={editingGame?.name}
            onChange={(e) => {
              setEditingGame((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          Club<Input className="day"
            value={editingGame?.email}
            onChange={(e) => {
              setEditingGame((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          Time<Input className="day"
            value={editingGame?.address}
            onChange={(e) => {
              setEditingGame((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
