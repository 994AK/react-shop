import { useState } from "react";
import "./styles.css";

export default function App() {
  // state代表保存用户列表
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //获取用户信息
  const fetchUsers = async () => {
    setLoading(true); //数据加载中
    try {
      const res = await fetch("https://reqres.in/api/users/");
      const json = await res.json();
      // 请求成功后用户信息存储
      setUsers(json.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false); //加载完毕
  };

  return (
    <div className="App">
      {/* 请求数据 */}
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "loading..." : "Show Users"}
      </button>
      {error && <div style={{ color: "red" }}>Failed: {String(error)}</div>}
      <br />
      <ul>
        {users.length > 0 &&
          users.map((user) => <li key={user.id}>{user.first_name}</li>)}
      </ul>
    </div>
  );
}
