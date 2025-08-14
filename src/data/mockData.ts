
import {
  EMetadataComponent,
  EMetadataInputType,
  EMetadataSelectMode,
  EPrecisionType,
  ETagCategoryStatus,
  ITagCategory,
} from "../interfaces/interfaces";

const sampleTagCategory: ITagCategory = {
  id: "6894a3d4148f1ffde8c5a5ea",
  gameId: "6622504e845d0e572cddc306",
  group: { label: "ball", value: "ball" },
  isParentTag: true,
  isReplay: false,
  metadataConfig: [
    {
      component: EMetadataComponent.INPUT,
      key: "eventId",
      label: "Event Id",
      readOnly: true,
      type: EMetadataInputType.TEXT,
    },
    {
      component: EMetadataComponent.INPUT,
      key: "over",
      label: "Over",
      required: true,
      type: EMetadataInputType.TEXT,
    },
    {
      component: EMetadataComponent.INPUT,
      key: "rating",
      label: "Rating",
      type: EMetadataInputType.NUMBER,
    },
    {
      component: EMetadataComponent.SELECT,
      key: "actionBy",
      label: "Ball By",
      required: true,
      mode: EMetadataSelectMode.QUERY,
      multiple: false,
      query: "players",
    },
    {
      component: EMetadataComponent.SELECT,
      key: "ballType",
      label: "Ball Type",
      required: false,
      mode: EMetadataSelectMode.OPTIONS,
      multiple: false,
      options: [
        { label: "UnderArm", value: "under-arm" },
        { label: "OverArm", value: "over-arm" },
      ],
    },
  ],
  name: "Ball",
  nameStructure: ["name", "eventId", "over"],
  precisionType: EPrecisionType.LONG,
  status: ETagCategoryStatus.ACTIVE,
  subCategories: {
    "no-ball": {
      label: "No Ball",
      config: [
        {
          component: EMetadataComponent.INPUT,
          key: "runs",
          label: "Runs",
          required: true,
          type: EMetadataInputType.NUMBER,
        },
        {
          component: EMetadataComponent.SELECT,
          key: "outcome",
          label: "Outcome",
          required: true,
          mode: EMetadataSelectMode.OPTIONS,
          multiple: false,
          options: [
            { label: "Wicket", value: "wicket" },
            { label: "Six", value: "six" },
            { label: "Four", value: "four" },
          ],
        },
      ],
    },
  },
  createdAt: Date.now(),
  deleted: false,
};
export default sampleTagCategory