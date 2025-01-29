// pango-dropdown.tsx
import { Component, h, State, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'pango-dropdown',
  styleUrl: 'pango-dropdown.scss',
  shadow: true,
})
export class PangoDropdown {
  @Element() host: HTMLElement;
  @State() isOpen: boolean = false;
  @Event() dropdownToggle: EventEmitter<boolean>;

  componentDidLoad() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (e: MouseEvent) => {
    const path = e.composedPath();
    if (!path.includes(this.host.shadowRoot)) {
      this.isOpen = false;
      this.dropdownToggle.emit(this.isOpen);
    }
  };

  private toggleDropdown = (e: Event) => {
    e.preventDefault();
    this.isOpen = !this.isOpen;
    this.dropdownToggle.emit(this.isOpen);
  };

  render() {
    return (
      <div class="pango-toolbar__dropdown">
        <a href="#" class="pango-toolbar__dropdown-trigger" onClick={this.toggleDropdown}>
          <slot name="trigger">Toggle Dropdown</slot>
        </a>
        <div class={`pango-toolbar__dropdown-menu ${this.isOpen ? 'pango-active' : ''}`}>
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}