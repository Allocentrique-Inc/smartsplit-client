export function GetRightHolderIdsByRole(role, rightHolders) {
    return rightHolders
        .filter(rightHolder => rightHolder.roles.includes(role))
        .map(rightHolder => rightHolder.id);
}

export function FilterRightHoldersByRole(role, rightHolders) {
    return Object.keys(rightHolders).filter(rightHolderUuid => rightHolders[rightHolderUuid].roles.includes(role));
}

export function FilterRightHoldersByRoles(roles, rightHolders) {
    return roles
        .reduce((filteredRightHolders, role) => {
            const newRightHolders = FilterRightHoldersByRole(role, rightHolders);
            return filteredRightHolders.concat(newRightHolders);
        }, [])
        .filter((rightHolder, index, self) => self.indexOf(rightHolder) === index);
}

export function AddRole(role) {
    return function (rightHolders, uuid) {
        const rightHolder = Object.assign({}, { roles: [] }, rightHolders[uuid]);
        const newRoles = rightHolder.roles.concat([role]);
        const newRightHolderKeyToMerge = { [uuid]: { roles: newRoles } };

        return Object.assign({}, rightHolders, newRightHolderKeyToMerge);
    };
}

export function RemoveRole(role) {
    return function (rightHolders, uuid) {
        const rightHolder = Object.assign({}, { roles: [] }, rightHolders[uuid]);
        const newRoles = rightHolder.roles.filter(holderRole => holderRole !== role);
        const newRightHolderKeyToMerge = { [uuid]: { roles: newRoles } };

        return Object.assign({}, rightHolders, newRightHolderKeyToMerge);
    }
}
