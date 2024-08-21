import { EntityHealthComponent, world } from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe((data) => {
    const { itemComponentRegistry, blockComponentRegistry } = data;
    itemComponentRegistry.registerCustomComponent("basic_addon:item_function", {
        onUse: (data) => {
            const { source } = data;
            const entity = source.getEntitiesFromViewDirection()[0];
            if (!entity)
                return;
            const comp = entity.entity.getComponent(EntityHealthComponent.componentId);
            if (!comp)
                return;
            source.onScreenDisplay.setActionBar(`${comp.currentValue}`);
        }
    });
    blockComponentRegistry.registerCustomComponent("basic_addon:block_function", {
        onPlayerInteract: (data) => {
            const block = data.block;
            const state = block.permutation.getState('basic_addon:state_1');
            if (state === undefined)
                return;
            switch (state) {
                case 0:
                    block.setPermutation(block.permutation.withState("basic_addon:state_1", 1));
                    break;
                case 1:
                    block.setPermutation(block.permutation.withState("basic_addon:state_1", 0));
                    break;
            }
        }
    });
});
