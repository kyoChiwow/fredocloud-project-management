import OnlineUsers from "./onlineUsers";

export default function WorkspaceHeader() {
  const { onlineUsers } = useSocketStore();

  return (
    <div className="flex justify-between items-center">
      <h1>Workspace</h1>

      <OnlineUsers users={onlineUsers} />
    </div>
  );
}