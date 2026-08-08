import React, { forwardRef, useMemo } from "react";
// import BottomSheet from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";

const FilterBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);

  return (
    <View></View>
    // <BottomSheet
    //   ref={ref}
    //   index={-1}
    //   snapPoints={snapPoints}
    //   enablePanDownToClose
    // >
    //   <Text>Filter Bottom Sheet</Text>
    // </BottomSheet>
  );
});

export default FilterBottomSheet;