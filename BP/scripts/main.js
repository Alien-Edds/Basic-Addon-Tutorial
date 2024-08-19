import { EntityHealthComponent, world } from "@minecraft/server";
world.beforeEvents.worldInitialize.subscribe((data) => {
    const { itemComponentRegistry } = data;
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
});
