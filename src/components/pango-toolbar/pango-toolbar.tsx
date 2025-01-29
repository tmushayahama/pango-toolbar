// pango-toolbar.tsx
import { Component, Prop, h, State, Element } from '@stencil/core';

@Component({
  tag: 'pango-toolbar',
  styleUrl: 'pango-toolbar.scss',
  shadow: true
})
export class PangoToolbar {
  @Element() el: HTMLElement;

  @Prop() headerTitle: string = 'PAN-GO';
  @Prop() headerSubTitle: string = 'Human Functionome';
  @Prop() pangoHome: string = '/';
  @Prop() showLoadingBar: boolean = false;

  @State() isDropdownOpen: boolean = false;

  private dropdownRef?: HTMLDivElement;

  componentDidLoad() {
    // Handle click outside for dropdown
    document.addEventListener('click', (e: MouseEvent) => {
      if (this.dropdownRef && !this.dropdownRef.contains(e.target as Node)) {
        this.isDropdownOpen = false;
      }
    });
  }

  disconnectedCallback() {
    document.removeEventListener('click', () => { });
  }

  private toggleDropdown = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  render() {
    return (
      <div class="toolbar">
        <div class="toolbar-container">
          {this.showLoadingBar && <div class="loading-bar"></div>}

          <button class="menu-button" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          <div class="logo-container">
            <a href={this.pangoHome} class="logo-link">
              <span class="logo-text">{this.headerTitle}</span>
            </a>
            <a href={this.pangoHome} class="logo-link">
              <span class="title-text">{this.headerSubTitle}</span>
            </a>
          </div>

          <div class="toolbar-actions">
            <div class="social-links">
              <a
                href="https://github.com/pantherdb/pango"
                target="_blank"
                class="menu-button"
                rel="noopener noreferrer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            <div class="action-buttons">
              <div
                class={`dropdown ${this.isDropdownOpen ? 'active' : ''}`}
                ref={(el) => this.dropdownRef = el as HTMLDivElement}
              >
                <button class="action-button" onClick={this.toggleDropdown}>
                  Download
                </button>
                <div class="dropdown-content">
                  <a href="https://functionome.org/download/export_annotations.zip">
                    As CSV
                  </a>
                  <a href="https://functionome.org/download/export_annotations.json.gz">
                    As JSON
                  </a>
                </div>
              </div>
              <a href={`${this.pangoHome}/about`} class="action-button">
                About
              </a>
            </div>

            <div class="logo-section">
              <div class="logo-divider">
                <a
                  href="http://geneontology.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/images/logos/go-logo-yellow.png"
                    alt="GO Logo"
                    class="logo-image"
                  />
                </a>
              </div>
              <div class="logo-divider">
                <a
                  href="http://pantherdb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/images/logos/panther-logo-yellow.png"
                    alt="Panther Logo"
                    class="logo-image"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}