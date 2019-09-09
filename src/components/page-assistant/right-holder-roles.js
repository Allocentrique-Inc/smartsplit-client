export function FilterRightHoldersByRole(role, rightHolders) {
    return Object.keys(rightHolders).filter(rightHolderUuid => rightHolders[rightHolderUuid].roles.includes(role));
}

export function FilterRightHoldersByRoles(roles, rightHolders) {
    return Object.keys(rightHolders).filter(rightHolderUuid => union(roles, rightHolders[rightHolderUuid].roles).length);
}

export function union(array1, array2) {
    return [... new Set([...array1, array2])];
}

export function PushRole(role) {
    return function(rightHolders, uuid) {
        const rightHolder = Object.assign({}, { roles: [] }, rightHolders[uuid]);
        const newRoles = rightHolder.roles.concat([role]);
        const newRightHolderKeyToMerge = { [uuid]: { roles: newRoles } };

        return Object.assign({}, rightHolders, newRightHolderKeyToMerge);
    };
}
