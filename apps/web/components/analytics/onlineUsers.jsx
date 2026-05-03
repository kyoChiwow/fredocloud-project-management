export default function OnlineUsers({ users }) {
  return (
    <div className="flex gap-2 items-center">
      {users.map((id) => (
        <div
          key={id}
          className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs"
        >
          {id.slice(0, 2).toUpperCase()}
        </div>
      ))}
    </div>
  );
}