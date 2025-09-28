export enum rentTypes {
  ENTIRE_TENANCY= "ENTIRE_TENANCY",
  SHARE_HOUSE ="SHARE_HOUSE",
};

export const houseType = {
  [rentTypes.ENTIRE_TENANCY]: "整租",
  [rentTypes.SHARE_HOUSE]: "合租",
}