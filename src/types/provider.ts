enum ProviderKeys {
     id = 'Provider ID',
     email = 'Provider Email Address',
     subRegion = 'Subregion',
}

interface Provider {
     id: string
     email: string
     subRegion: string
}

export { Provider, ProviderKeys }
