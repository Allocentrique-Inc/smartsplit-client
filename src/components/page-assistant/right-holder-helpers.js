export const getRightHolderIdsByRole = (role, rightHolders) => {
    console.log(role, rightHolders)
    return rightHolders
        .filter(rightHolder => rightHolder.roles.includes(role))
        .map(rightHolder => rightHolder.id);
};

export const getRightHoldersByAnyRole = (roles, rightHolders) => {
    return rightHolders
        .filter(rightHolder => roles.some(role => rightHolder.roles.includes(role)));
};

export const getRightHolderIdsByAnyRole = (roles, rightHolders) => {
    return getRightHoldersByAnyRole(rightHolders).map(rightHolder => rightHolder.id);
};

export const addRightHolderIfMissing = (rightHolders, id) => {
    const newRightHolder = { id: id, roles: [] };
    return rightHolders.map(rightHolder => rightHolder.id).includes(id) ?
        rightHolders :
        rightHolders.concat([newRightHolder]);
};

export const updateRightHolders = (rightHolders, updatedRightHolder) => {
    return rightHolders
        .filter(rightHolder => rightHolder.id !== updatedRightHolder.id)
        .concat([updatedRightHolder])
        .filter(hasRoles);
}

export const updateRole = (role, roleBearers, id, rightHolderRoles) => {
    return roleBearers.includes(id) ?
        rightHolderRoles.concat([role]).filter(isUnique) :
        rightHolderRoles.filter(isNotRole(role));
};

export const isUnique = (value, index, self) => index === self.indexOf(value);
export const isNotRole = role => rightHolderRole => rightHolderRole !== role;
export const hasRoles = rightHolder => rightHolder.roles && rightHolder.roles.length;
