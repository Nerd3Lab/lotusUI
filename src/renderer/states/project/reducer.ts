import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { ProjectInterface, ProjectJsonInterface } from '@/main/types/index';
import { revertAllRedux } from '@/renderer/states/action';

interface ProjectState extends ProjectInterface {
  status: {
    loading: boolean;
    running: boolean;
    error: boolean;
  };
  logs: string[];
  transactionBlocks: number;
  checkpointDone: boolean;
  lastestCheckpoint: number;
}

const initialState: ProjectState = {
  configJson: {
    name: '',
    fullnode: false,
    epochDuration: 60,
    isAutoReset: false,
    createdAt: 0,
    lastedActive: 0,
    description: '',
    transactionBlocks: 0,
  },
  path: '',
  status: {
    loading: false,
    running: false,
    error: false,
  },
  logs: [],
  transactionBlocks: 0,
  checkpointDone: false,
  lastestCheckpoint: 0,
};

export const ProjectSlide = createSlice({
  name: 'project',
  initialState,
  extraReducers: (builder) =>
    builder.addCase(revertAllRedux, () => initialState),
  reducers: {
    selectProject: (state, { payload }: { payload: ProjectInterface }) => {
      state.path = payload.path;

      state.configJson.name = payload.configJson.name;
      state.configJson.fullnode = payload.configJson.fullnode;
      state.configJson.epochDuration = payload.configJson.epochDuration;
      state.configJson.isAutoReset = payload.configJson.isAutoReset;
      state.configJson.createdAt = payload.configJson.createdAt;
      state.configJson.lastedActive = payload.configJson.lastedActive;
      state.configJson.description = payload.configJson.description;
      state.configJson.transactionBlocks = payload.configJson.transactionBlocks;

      state.status.loading = false;
      state.status.running = false;
      state.status.error = false;
    },
    setStatus: (
      state,
      {
        payload,
      }: { payload: { loading?: boolean; running?: boolean; error?: boolean } },
    ) => {
      if (payload.loading !== undefined) state.status.loading = payload.loading;
      if (payload.running !== undefined) state.status.running = payload.running;
      if (payload.error !== undefined) state.status.error = payload.error;
    },
    addLog: (state, { payload }: { payload: string }) => {
      state.logs.push(payload);
    },
    setTransactionBlocks: (state, { payload }: { payload: number }) => {
      state.transactionBlocks = payload;
    },
    setCheckpointDone: (state, { payload }: { payload: boolean }) => {
      state.checkpointDone = payload;
    },
    setLastestCheckpoint: (state, { payload }: { payload: number }) => {
      state.lastestCheckpoint = payload;
    }
  },
});

export default ProjectSlide.reducer;

export const useProjectState = () => {
  return useAppSelector((state) => state.project);
};
