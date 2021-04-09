type Color = 'black' | 'green' | 'red' | 'blue' | 'purple' | 'rose' | 'verdun' | 'berry' | 'grey'
  | 'mental' | 'physical' | 'spiritual' | 'social' | 'environmental' | 'economic';

export interface HorizontalTabsItem {
  name: string;
  color: Color;
  id: string;
  active: boolean;
}
