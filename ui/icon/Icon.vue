<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import type { IconNameType } from './iconName.type';

type Props = {
  /**
   * @param name - svg-icon name from `~/assets/icons/sprite` directory
   * @example <Icon name="edit" /> or <Icon :name="item.icon" />
   */
  name?: IconNameType;

  /**
   * @param fill - Customize color for svg fill (ignore it if stroke is exists)
   * @example <Icon name="edit" fill="#333333" />
   */
  fill?: string;

  /**
   * @param stroke - Customize color for svg stroke
   * @example <Icon name="edit" stroke="#333333" />
   */
  stroke?: boolean | string;

  /**
   * @param size - Icon size
   * @default 'md'
   */
  size?: 'md' | 'lg' | number;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  stroke: false,
});

const ICON_PREFIX = 'icon';
const symbolId = computed(() => {
  return `#${ICON_PREFIX}-${props.name}`;
});

const currentStroke = computed(() => (typeof props.stroke === 'string' ? props.stroke : undefined));

const styles = computed<CSSProperties | undefined>(() => {
  if (typeof props.size === 'number') {
    const size = `${props.size}px`;

    return {
      width: size,
      height: size,
    };
  }

  return undefined;
});
</script>

<template>
  <svg
    v-if="!!name"
    :class="[
      $style.icon,
      {
        [$style.icon_stroke]: !!stroke,
        [$style.icon_md]: size === 'md',
        [$style.icon_lg]: size === 'lg',
      },
    ]"
    :style="styles"
    aria-hidden="true"
  >
    <use :href="symbolId" :fill="fill" :stroke="currentStroke" />
  </svg>
</template>

<style lang="scss" module>
.icon {
  width: 1em;
  height: 1em;
  fill: currentcolor;
  stroke: none;

  &_stroke {
    fill: none;
    stroke: currentcolor;
  }

  &_md {
    width: 20px;
    height: 20px;
  }

  &_lg {
    width: 24px;
    height: 24px;
  }
}
</style>
