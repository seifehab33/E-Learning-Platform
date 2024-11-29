import { GridProvider } from "../../../Context/GridContext";
import InstList from "../InstructorList/InstList";
import InstructorMain from "./InstructorMain";

function InstructorLayout() {
  return (
    <GridProvider>
      <InstructorMain />
      <InstList />
    </GridProvider>
  );
}

export default InstructorLayout;
