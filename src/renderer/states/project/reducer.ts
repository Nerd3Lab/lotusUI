import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { ProjectInterface, ProjectJsonInterface } from '@/main/types/index';

interface ProjectState extends ProjectInterface {}

const initialState: ProjectState = {
  configJson: {
    name: '',
    fullnode: false,
    epochDuration: 60,
    suiVersion: '',
    isAutoReset: false,
    createdAt: 0,
    lastedActive: 0,
    description: '',
  },
  path: '',
};

export const ProjectSlide = createSlice({
  name: 'project',
  initialState,
  reducers: {
    selectProject: (state, { payload }: { payload: ProjectInterface }) => {
      state.path = payload.path;

      state.configJson.name = payload.configJson.name;
      state.configJson.fullnode = payload.configJson.fullnode;
      state.configJson.epochDuration = payload.configJson.epochDuration;
      state.configJson.suiVersion = payload.configJson.suiVersion;
      state.configJson.isAutoReset = payload.configJson.isAutoReset;
      state.configJson.createdAt = payload.configJson.createdAt;
      state.configJson.lastedActive = payload.configJson.lastedActive;
      state.configJson.description = payload.configJson.description;
    },
  },
});

export default ProjectSlide.reducer;
