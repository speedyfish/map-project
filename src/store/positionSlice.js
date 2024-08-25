import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  positions: [] // Array to store multiple positions
};

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setPositions(state, action) {
      // Limit to two positions
      if (state.positions.length >= 2) {
        state.positions = [...state.positions.slice(1), action.payload];
      } else {
        state.positions.push(action.payload);
      }
    },
  },
});

export const { setPositions } = positionSlice.actions;
export default positionSlice.reducer;
