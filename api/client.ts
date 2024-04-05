import { defu } from 'defu';
import { useRuntimeConfig } from 'nuxt/app';

/**
 * $fetch wrapper for easy use in code
 *
 * @param {string} url request URL
 * @param {options} options options
 */
export default function useCustomFetch<TData>(url: string, options = {}) {
    const config = useRuntimeConfig();

    const defaults = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        baseURL: config.apiGatewayUrl || config.public.apiGatewayUrl,
    };

    const params = defu(options, defaults);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return $fetch<TData>(`/api/${url}`, params);
}
