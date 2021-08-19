import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import './styles/global.scss'

export function Task() {
  return (
    <>
      <Header />
      <TaskList />
    </>
  )
}